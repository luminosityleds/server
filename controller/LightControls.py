
from machine import Pin
import neopixel


class LED_Control:

    def __init__(self, pin, pixelNums):
        '''
        Initializes an the control of Led object

        pin (machine class): includes pin for Rasberry Pi Pico W where Led is being used
        pixelNums (integer): number of Leds that will be used for full strip
        '''
        self.pin = machine.Pin(pin, Pin.OUT)
        self.VBUS = Pin('WL_GPIO2', Pin.IN)
        self.pixelNums = pixelNums

        self.main = neopixel.NeoPixel(self.pin, self.pixelNums)
        self._color = (0, 0, 0)
        self._noColor = (0, 0, 0)
        self._brightness = 0

    def setColor(self, color):
        '''
        Initializes the color of the Led Strip

        color (touple): takes in the touple variable for setting the color when instantiated.

        For now this lights up all the LED's in the strip
        '''
        self._setColor(color)
        for i in range(self.pixelNums):
            self.main[i] = (self._color)
        self.update()

    def _setColor(self, color):
        '''
        Safely sets the color touple for the main method of setColor

        color (touple): takes in the touple variable for setting the color when instantiated.

        '''
        self._color = color

    def setBrightness(self, brightness):
        '''
        Used to change brightness

        brightness (integer): takes in a numerical value in order to change the brightness of the LED, should
        correspond directly to the setColor.

        This is still currently a work in progress

        '''
        if brightness < 1:
            brightness = 1
        if brightness > 255:
            brightness = 255
        self.brightnessVal = brightness

        # for i in self.main[3]:
        #     if i < brightness:

        self.update()

    def _setBrightness(self, brightness):
        '''
        Used to change brightness

        brightness (integer): takes in a numerical value in order to change the brightness of the LED, should
        correspond directly to the setColor.

        This is still currently a work in progress

        '''

        self._setBrightness = brightness

    def isConnectedToPower(self):
        '''
        Used to check if the central power to the LED are getting the 5 volts.

        The user will be able to call member function to confirm if power is being given to LED's 

        '''
        if (self.VBUS.value()):
            print('Power is High: ', self.VBUS.value())

        else:
            print('Power is Low: ', self.VBUS.value())

    def LEDStatus(self):
        '''
        Indicates weather the LED is on an ON or OFF state. 

        The user will be able to call member function to confirm if at least the first LED is displaying color. 

        '''
        if self.main[0] == self._noColor:
            print("LED is Off")
        else:
            print("LED is On")

    def update(self):
        '''
        Instantiates the "write" method from the neopixel in order to update any changes 
        '''

        self.main.write()
