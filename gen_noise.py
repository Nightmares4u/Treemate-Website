import random
import base64
from PIL import Image

width, height = 128, 128
img = Image.new('RGBA', (width, height))
pixels = img.load()

for y in range(height):
    for x in range(width):
        v = random.randint(0, 255)
        # make it dark or light but very high contrast random dots
        # alpha can vary for more texture
        a = random.randint(50, 100) 
        pixels[x, y] = (v, v, v, a)

img.save('noise.png')
with open("noise.png", "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    print("data:image/png;base64," + encoded_string)
