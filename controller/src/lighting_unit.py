from neopixel import NeoPixel # pylint: disable=E0401
from machine import Pin # pylint: disable=E0401


class LightingUnit:
    """
    A class representing an LED lighting unit.
    """

    def __init__(self, outputPin: int = 1, pixelCount: int = 0):
        """
        Constructor method for creating a LightingUnit object.

        :param outputPin: controller's output pin ID to unit
        :param pixelCount: the number of pixels in the unit
        """
        self._pinOut = Pin(outputPin, Pin.OUT)
        self._pixelCount = pixelCount
        self._color = (0, 0, 0)
        self._brightness = 0
        self._lightingUnit = NeoPixel(self._pinOut, self._pixelCount)


    # Public Interface
    def set(self, color: "tuple[int, int, int]", brightness: int):
        """
        Sets the color and brightness of the lighting unit.

        :param color: RGB representation of unit's color, 0-255 for each
        :param brightness: the brightness of the unit, 0-100
        """
        self._setColor(color)
        self._setBrightness(brightness)
        self._updateUnit()

    def setColor(self, color: "tuple[int, int, int]"):
        """
        Sets the color of the lighting unit.

        :param color: RGB representation of unit's color, 0-255 for each
        """
        self._setColor(color)
        self._updateUnit()

    def setBrightness(self, brightness: int):
        """
        Sets the brightness of the lighting unit.

        :param brightness: the brightness of the unit, 0-100
        """
        self._setBrightness(brightness)
        self._updateUnit()

    def setPinOut(self, outputPin: int, zeroFormerPin: bool = True):
        """
        Sets the output pin from the MCU to the lighting unit.

        :param outputPin: controller's output pin ID to unit
        """
        if zeroFormerPin: # Send message to former pinOut to turn all pixels off
            self._lightingUnit.fill((0, 0, 0))
        self._setPinOut(outputPin)
        self._updateUnit()

    def setPixelCount(self, pixelCount: int):
        """"
        Sets the pixel count of the unit.

        :param pixelCount: the number of pixels in the unit
        """
        self._setPixelCount(pixelCount)
        self._updateUnit()


    #Private Methods
    def _setColor(self, color: "tuple[int, int, int]"):
        """
        Sets the color without updating the unit.

        :param color: RGB representation of unit's color, 0-255 for each
        """
        self._color = color

    def _setBrightness(self, brightness: int):
        """
        Sets brightness without updating the unit.

        :param brightness: :param brightness: the brightness of the unit, 0-100
        """
        self._brightness = brightness

    def _setPinOut(self, pinOut: int):
        """Sets the output pin without updating the unit.

        :param pinOut: controller's output pin ID to unit
        """
        self._pinOut = pinOut

    def _setPixelCount(self, pixelCount: int):
        """
        Sets the pixel count without updating the unit.

        :param pixelCount: the number of pixels in the unit
        """
        self._pixelCount = pixelCount

    def _scaleColorByBrightness(self) -> "tuple[int, int, int]":
        """
        Returns the unit's color tuple scaled to the unit's brightness.

        :return: unit's RGB color tuple scaled by the unit's brightness
        """
        scaledColor = []

        for component in self._color:
            try:
                scaledColor.append(
                    int(round(component * self._brightness / 100)))
            except ZeroDivisionError:
                scaledColor.append(0)

        return tuple(scaledColor)

    def _updateUnit(self):
        """
        Updates the unit's brightness and color state based on object's
        attributes.
        """
        self._lightingUnit.fill(self._scaleColorByBrightness())
        self._lightingUnit.write()
