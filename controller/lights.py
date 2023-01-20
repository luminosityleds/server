
from machine import Pin # pylint: disable=E0401
import neopixel # pylint: disable=E0401


# Constants
_GPIO_PIN = 28
_pixelCount = 60
_OFFColor = [0, 0, 0]

# Fields
_pin = Pin(_GPIO_PIN, Pin.OUT)
_neopixel = neopixel.NeoPixel(_pin, _pixelCount)
_color = [0, 0, 0]
_brightness = 0
_powered = False

# Public Methods
def setColor(color):
    '''
    Initializes the color of the LED's

    color (list): takes in the list variable for setting the color when instantiated.

    '''
    _color = color
    for i in range(_pixelCount):
        _neopixel[i] = (_color)

def getColor():
    '''
    Returns list of the current color of LED's

    '''

def setBrightness(brightness):
    '''
    Allows to change brightness of LED's

    brightness (integer): takes in a numerical value in order to change the brightness of the LED, scaled from 0 to 100

    '''


def getBrightness():
    '''
    Returns integer of the current brightness of LED's

    '''
    

def setPowered(power):
    '''
    Allows to set conencted state of LED's
    '''
    _powered = power
    if _powered == True:
        setColor([255,255,255])
    setColor([0,0,0])


def getPowered():
    '''
    Returns bool if LED's are on

    '''
    if _neopixel[0] == _OFFColor:
        return False
    return True