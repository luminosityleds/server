
from machine import Pin # pylint: disable=E0401
import neopixel # pylint: disable=E0401


class LED_Control:

    def __init__(self, pin, pixelNums):
        '''
        Initializes an the control of Led object

        pin (machine class): includes pin for Rasberry Pi Pico W where Led is being used
        pixelNums (integer): number of Leds that will be used for full strip
        '''

        self._neopixel = neopixel.NeoPixel(self._pin, self._pixelCount)
        self._pin = machine.Pin(pin, Pin.OUT)
        self._pixelCount = pixelNums
        #_GPIO_PIN 
        self._color = [0, 0, 0]
        self._OFF = [0, 0, 0]
        self._brightness = 0
        self._powered = False

    def setColor(self, color):
        '''
        Initializes the color of the LED's

        color (list): takes in the list variable for setting the color when instantiated.

        '''
    def getColor(self):
        '''
        Returns list of the current color of LED's

        '''

    def setBrightness(self, brightness):
        '''
        Allows to change brightness of LED's

        brightness (integer): takes in a numerical value in order to change the brightness of the LED, scaled from 0 to 100

        '''
    
    def getBrightness(self):
        '''
        Returns integer of the current brightness of LED's

        '''

    def setPowered(self, power):
        '''
        Allows to set conencted state of Pico W
        '''
    def getPowered(self):
        '''
        Returns bool if Pico W is connected to power

        '''
    def setConnected(self, connect):
        '''
        Allows to set connected state of LED's

        '''
    def getConnected(self):
        '''
        Returns bool if LED's are connected/showing color

        '''
