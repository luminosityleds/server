from LightControls import LED_Control
from time import sleep


from machine import Pin # pylint: disable=E0401
import neopixel # pylint: disable=E0401


# This object is used to start the program, we are calling it "LEDSTRIP"
LEDSTRIP = LED_Control(28, 60)

# Adding differnt colors
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
magenta = (255, 0, 255)
off = (0, 0, 0)


# LEDSTRIP.setBrightness(20)
# LEDSTRIP.setBrightness(20)

# While loop starts the program where we are sifting through multiple color changes
while True:
    LEDSTRIP.setColor(red)
    sleep(1)
    LEDSTRIP.LEDStatus()
    sleep(1)
    LEDSTRIP.setColor(green)
    sleep(1)
    LEDSTRIP.LEDStatus()
    sleep(1)
    LEDSTRIP.setColor(off)
    sleep(1)
    LEDSTRIP.isConnectedToPower()
    LEDSTRIP.LEDStatus()
    sleep(1)
