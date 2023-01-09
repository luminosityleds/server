# lightDemo.py

from lib.lightingUnit import LightingUnit
from time import sleep
from random import randint

OUTPUT_PIN = 4 # use GPxx number
PIXEL_COUNT = 60 # number of pixels in the lighting unit
PULSE_SPEED = 0.014 # lower is faster

def run() -> None:
    ws2812 = LightingUnit(OUTPUT_PIN, PIXEL_COUNT)

    # Changing color and brightness
    red = (255, 0, 0)
    green = (0, 0, 255)
    ws2812.set(red, 100)
    sleep(2)
    ws2812.setBrightness(5)
    sleep(2)
    ws2812.setColor(green)
    sleep(2)
    ws2812.setBrightness(75)
    sleep(2)

    # Simple animation exhibiting color and brightness changes to the lighting unit
    while True:
        color = tuple(randint(0, 255) for i in range(3)) #random RGB color tuple
        for i in range(0, 100): # 100 Brightness steps
            brightness = 100 - i
            ws2812.set(color, brightness)
            sleep(PULSE_SPEED)
