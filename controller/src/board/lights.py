from neopixel import NeoPixel # type: ignore pylint: disable=E0401
from machine import Pin # type: ignore pylint: disable=E0401

# Constants
_GPIO_PIN = 28
_PIXEL_COUNT = 60
_POWER_OFF_COLOR = (0, 0, 0)

# Fields
_pinOut = Pin(_GPIO_PIN, Pin.OUT)
_color = (255, 255, 255)
_brightness = 25
_powered = False
_neopixel = NeoPixel(_pinOut, _PIXEL_COUNT)

# Public Methods
def setColor(color : "tuple[int, int, int]"):
    """
    Sets the color of the LEDs

    :param color: RGB representation of unit's color, 0-255 for each
    """
    print("here")
    global _color
    _color = color
    _updateUnit()

def getColor() -> "tuple[int, int, int]":
    """
    Returns current LED color value
    """
    return _color

def setBrightness(brightness : int):
    """
    Sets the brightness of the LEDs

    :param brightness: the brightness of the unit, 0-100
    """
    global _brightness
    _brightness = brightness
    _updateUnit()

def getBrightness() -> int:
    """
    Returns integer of the current brightness of LED's

    :param brightness: the brightness of the unit, 0-100
    """
    return _brightness

def setPowered(powered : bool):
    """
    Sets the powered state of the LEDs

    :param powered: the powered state of the unit; True: on, False: off
    """
    global _powered
    _powered = powered
    _updateUnit()

def getPowered() -> bool:
    """
    Returns the powered state of the unit; True: on, False: off

    """
    return _powered

#Private Methods
def _scaleColorByBrightness() -> "tuple[int, int, int]":
    """
    Returns the unit's color tuple scaled to the unit's brightness.

    :return: unit's RGB color tuple scaled by the unit's brightness
    """
    scaledColor = []

    for component in _color:
        try:
            scaledColor.append(
                int(round(component * _brightness / 100)))
        except ZeroDivisionError:
            scaledColor.append(0)

    return tuple(scaledColor)

def _updateUnit():
    """
    Updates the unit's brightness and color state based on object's
    attributes.
    """
    if _powered:
        _neopixel.fill(_scaleColorByBrightness())
        _neopixel.write()

    else: # turn all LEDs off
        _neopixel.fill(_POWER_OFF_COLOR)
        _neopixel.write()
