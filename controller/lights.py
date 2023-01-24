
from machine import Pin 
import neopixel 
from time import sleep

# Constants
_GPIO_PIN = 28
_pixelCount = 60
_OFFColor = [0, 0, 0]
_ONColor = [255, 255, 255]

# Fields
_pin = Pin(_GPIO_PIN, Pin.OUT)
_neopixel = neopixel.NeoPixel(_pin, _pixelCount)
_color = [0, 0, 0]
_brightness = 0
_powered = False
scaledColor = []
UnscaledColor = []

# Public Methods
def setColor(color:list):
    '''
    Initializes the color of the LED's

    color (list): takes in the list variable for setting the color when instantiated.

    '''
    _color = color
    for i in range(_pixelCount):
        _neopixel[i] = (_color)
    _neopixel.write()

def getColor() -> list:
    '''
    Returns list of the current color of LED's

    '''
    return (list(_neopixel[0]))

def setBrightness(_brightness:int):
    '''
    Allows to change brightness of LED's

    brightness (integer): takes in a anumerical value in order to change the brightness of the LED, scaled from 0 to 100

    '''
    
    for component in getColor():
        try:
            scaledColor.append(int(round(component * _brightness / 100)))  
        except ZeroDivisionError:
            scaledColor.append(0)
    setColor(scaledColor)


def getBrightness()-> int:
    '''
    Returns integer of the current brightness of LED's

    '''
    for component in getColor():
        try:
            UnscaledColor.append(int(round((component * 100)/255)))  
            
        except ZeroDivisionError:
            UnscaledColor.append(0)
    _brightness= UnscaledColor[0] 
    return (_brightness)
        


def setPowered(power:bool):
    '''
    Allows to set conencted state of LED's
    '''
    _powered = power
    if _powered == True:
        setColor(_ONColor)
    if _powered == False:
        setColor(_OFFColor)


def getPowered() -> bool:
    '''
    Returns bool if LED's are on

    '''
    if list(_neopixel[0]) == _OFFColor:
        return False
    return True
