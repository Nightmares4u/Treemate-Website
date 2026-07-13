/**
 * Treemate contact form → Google Sheet.
 *
 * Paste this whole file into the Apps Script project attached to the
 * "Treemate Website Leads" spreadsheet (Extensions → Apps Script).
 *
 * One-time setup, in order:
 *   1. Run setupSheet() once from the editor. It builds the "Leads" tab,
 *      the header row, and the Status dropdown for you.
 *   2. Project Settings → Script Properties → add API_SECRET.
 *   3. Deploy → New deployment → Web app → Execute as "Me",
 *      Who has access "Anyone". Copy the /exec URL.
 *
 * See docs/CONTACT_FORM_SETUP.md in the website repo for the full walkthrough.
 */

var SHEET_NAME = "Leads";

var HEADERS = [
  "Date",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Service",
  "Budget",
  "Subject",
  "Message",
  "Source",
  "Status",
];

var STATUS_OPTIONS = ["New", "Contacted", "Qualified", "Closed", "Spam"];

/** Fields the website guarantees are present. Budget and Subject are optional. */
var REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "service",
  "message",
];

/**
 * Returns the Leads sheet, creating the tab and its header row if they are
 * missing. doPost calls this on every submission, so a fresh spreadsheet
 * provisions itself on the first lead — nobody has to remember to run anything.
 * Idempotent: existing headers and rows are left untouched.
 */
function getOrCreateSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    // Reuse a lone untouched default tab rather than leaving "Sheet1" behind.
    var sheets = spreadsheet.getSheets();
    if (sheets.length === 1 && sheets[0].getLastRow() === 0) {
      sheet = sheets[0].setName(SHEET_NAME);
    } else {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
  }

  // Header row absent (brand new tab, or someone cleared row 1).
  if (sheet.getLastRow() === 0 || !sheet.getRange(1, 1).getValue()) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#0A1628")
      .setFontColor("#FFFFFF");

    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");

    var widths = [150, 120, 120, 220, 150, 160, 150, 220, 420, 150, 110];
    for (var i = 0; i < widths.length; i++) {
      sheet.setColumnWidth(i + 1, widths[i]);
    }

    // Status dropdown on every data row.
    var statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(STATUS_OPTIONS, true)
      .setAllowInvalid(false)
      .build();
    sheet
      .getRange(2, HEADERS.length, sheet.getMaxRows() - 1, 1)
      .setDataValidation(statusRule);
  }

  return sheet;
}

/**
 * Optional. Run from the editor (select setupSheet → Run) to build the tab and
 * headers ahead of the first submission. doPost does the same work on demand,
 * so this is a convenience, not a requirement.
 */
function setupSheet() {
  var sheet = getOrCreateSheet_();
  SpreadsheetApp.flush();
  Logger.log('Sheet "%s" is ready with %s columns.', sheet.getName(), HEADERS.length);
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        message: "No submission data was received.",
      });
    }

    var data = JSON.parse(e.postData.contents);
    var expectedSecret =
      PropertiesService.getScriptProperties().getProperty("API_SECRET");

    // Only the Treemate server knows this. Blocks direct calls to the /exec URL.
    if (!expectedSecret || data.secret !== expectedSecret) {
      return jsonResponse({ success: false, message: "Unauthorized request." });
    }

    // Honeypot. Report success so bots do not learn they were caught.
    if (data.website) {
      return jsonResponse({ success: true, message: "Submission received." });
    }

    var row = {
      firstName: safeCell(data.firstName, 100),
      lastName: safeCell(data.lastName, 100),
      email: safeCell(data.email, 254),
      phone: safeCell(data.phone, 50),
      service: safeCell(data.service, 100),
      budget: safeCell(data.budget, 100),
      subject: safeCell(data.subject, 200),
      message: safeCell(data.message, 5000),
    };

    for (var i = 0; i < REQUIRED_FIELDS.length; i++) {
      if (!row[REQUIRED_FIELDS[i]]) {
        return jsonResponse({
          success: false,
          message: "Required information is missing.",
        });
      }
    }

    if (!isValidEmail(row.email)) {
      return jsonResponse({
        success: false,
        message: "The email address is invalid.",
      });
    }

    // Keep concurrent submissions from landing on the same row. Taken before
    // the sheet is provisioned so two simultaneous first-ever leads cannot both
    // try to create the header row.
    lock.waitLock(10000);

    var sheet = getOrCreateSheet_();

    sheet.appendRow([
      new Date(),
      row.firstName,
      row.lastName,
      row.email,
      row.phone,
      row.service,
      row.budget,
      row.subject,
      row.message,
      "Treemate Website",
      "New",
    ]);

    return jsonResponse({
      success: true,
      message: "Your message was submitted successfully.",
    });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      success: false,
      message: "The submission could not be saved.",
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // No lock was ever acquired — nothing to release.
    }
  }
}

/** GET exists only so you can eyeball that the deployment is live. */
function doGet() {
  return jsonResponse({ success: true, message: "Treemate contact endpoint is live." });
}

function safeCell(value, maxLength) {
  var text = String(value == null ? "" : value).trim().slice(0, maxLength);

  /*
   * Sheets treats a leading =, +, - or @ as the start of a formula. Prefixing
   * an apostrophe forces the value to stay plain text (formula injection).
   */
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return text;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}
