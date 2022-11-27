from neopixel import NeoPixel
from machine import Pin


class LightingUnit:
    """A class representing an LED lighting unit. It implements some basic
    functionality necessary for controlling a hardware LED lighting unit,
    such as those made up of addressable pixels (like the WS2812B) connected
    in serial

    :param outputPin: the pin ID for the controller's output to the lighting
        unit
    :type outputPin: int
    :param pixelCount: the number of pixels in the lighting unit
    :type pixelCount: int
    """
    def __init__(self, outputPin, pixelCount):
        """Constructor method
        """
        self._pinOut = Pin(outputPin, Pin.OUT)
        self._pixelCount = pixelCount # number of pixel in the lighting unit
        self._color = (0, 0, 0)
        self._brightness = 0
        self._lightingUnit = NeoPixel(self._pinOut, self._pixelCount)


    # Public Interface
    def set(self, color, brightness):
        """Sets the color and brightness of the lighting unit

        :param color: RGB tuple representing the color of the lighting unit, 
            with each value being between 0 and 255, inclusive
        :type color: int tuple
        :param brightness: the brightness of the lighting unit, between 0 and
            100, inclusive
        :type brightness: int
        """
        self._setColor(color)
        self._setBrightness(brightness)
        self._updateUnit()

    def setColor(self, color):
        """Sets the color of the lighting unit
        
        :param color: RGB tuple representing the color of the lighting unit,
            with each value being between 0 and 255, inclusive
        :type color: int tuple
        """
        self._setColor(color)
        self._updateUnit()

    def setBrightness(self, brightness):
        """Sets the brightness of the lighting unit
        
        :param brightness: the brightness of the lighting unit, between 0 and
            100, inclusive
        :type brightness: int
        """
        self._setBrightness(brightness)
        self._updateUnit()

    def setPinOut(self, outputPin, zeroFormerPin=True):
        """Sets the output pin from the MCU to the lighting unit

        :param outputPin: the pin ID for the controller's output to the lighting
            unit
        :type outputPin: int
        """
        if zeroFormerPin: # Send message to former pinOut to turn all pixels off
            self.lightingUnit.fill((0, 0, 0))
        self._setPinOut(outputPin)
        self._updateUnit()

    def setPixelCount(self, pixelCount):
        """"Sets the pixel count of the LightingUnit object
        
        :param pixelCount: the number of pixels in the lighting unit
        :type pixelCount: int"""
        self._setPixelCount(pixelCount)
        self._updateUnit()


    #Private Methods
    def _setColor(self, color):
        """Sets the color without updating the lighting unit

        :param color: RGB tuple representing the color of the lighting unit,
            with each value being between 0 and 255, inclusive
        :type color: int tuple
        """
        self._color = color
        #TODO: validate color

    def _setBrightness(self, brightness):
        """Sets brightness without updating the lighting unit
        
        :param brightness: the brightness of the lighting unit, between 0 and
            100, inclusive
        :type brightness: int
        """
        self._brightness = brightness
        #TODO: validate brightness

    def _setPinOut(self, pinOut):
        """Sets the output pin

        :param pinOut: the pin ID for the controller's output to the lighting
            unit
        :type pinOut: int
        """
        self._pinOut = pinOut
        #TODO: validate pinOut

    def _setPixelCount(self, pixelCount):
        """Sets the pixel count

        :param pixelCount: the number of pixels in the lighting unit
        :type pixelCount: int
        """
        self._pixelCount = pixelCount

    def _scaleColorByBrightness(self):
        """Returns the unit's color tuple scaled to the unit's brightness
        
        :return: unit's color tuple scaled to the unit's brightness
        :rtype: color tuple of size 3 with value between 0 and 255, inclusive
        """
        scaledColor = []
        for component in self._color:
            try:
                scaledColor.append(int(round(
                    component * self._brightness / 100)))
            except ZeroDivisionError:
                scaledColor.append(0)
        #TODO: Verify scaledColor is of length 3
        return tuple(scaledColor)

    def _updateUnit(self):
        self._lightingUnit.fill(self._scaleColorByBrightness())
        self._lightingUnit.write()
