import re

with open('src/components/layout/Footer.tsx', 'r') as f:
    content = f.read()

# Replace footer wrapper
content = content.replace(
    '<footer className="relative bg-navy text-white/80">',
    '<footer className="relative bg-[#F8F9FA] text-navy overflow-hidden">\n      {/* Background Grid Pattern */}\n      <div className="absolute inset-0 bg-grid pointer-events-none opacity-100" />'
)

# Add z-10 to Container
content = content.replace(
    '<Container className="pt-20 pb-10">',
    '<Container className="pt-20 pb-10 relative z-10">'
)

# Replace TreemateLogo variant
content = content.replace('variant="white"', 'variant="navy"')

# Replace text-white variations
content = content.replace('text-white/80', 'text-navy/80')
content = content.replace('text-white mb-3', 'text-navy mb-3')
content = content.replace('text-white/60', 'text-navy/60')
content = content.replace('text-white/70', 'text-navy/70')
content = content.replace('text-white/50', 'text-navy/50')
content = content.replace('text-white/40', 'text-navy/40')
content = content.replace('bg-white/5', 'bg-navy/5')
content = content.replace('border-white/10', 'border-navy/10')

# Except keep hover:text-white as is in the social icon, let's revert that if needed
content = content.replace('hover:text-navy', 'hover:text-white') # just in case, wait, only hover:text-white was present

# Replace teal-light with teal
content = content.replace('text-teal-light', 'text-teal')
content = content.replace('hover:text-teal-light', 'hover:text-teal')

with open('src/components/layout/Footer.tsx', 'w') as f:
    f.write(content)

