# Controller

## Hardware
MCU (Microcontroller Unit): [Raspberry Pi Pico W](https://www.raspberrypi.com/products/raspberry-pi-pico/)
LED Device: [WS2812B](https://cdn-shop.adafruit.com/datasheets/WS2812B.pdf) LED Strip - [Alitove 60 Pixel](https://www.amazon.com/gp/product/B01MG49QKD/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&th=1)

The LED strip is comprised of 60 WS2812B LED chips connected in serial. A
convenient feature if the WS2812B and similar LEDs is that they utilize a
single wire connection for data input/output and can be strung together at
arbitrary lengths, so long as power and the signal strength allows.

Each WS2812B chip has a red, green, blue, and sometimes white LED on it. Each is
also individually addressable, meaning each one can be controlled separately by
the MCU. All this allows for incredible flexibility in color, pattern, and
animation.

## Development Environment
TODO: Document steps to setup the development environment

## LightingUnit Class
This class is meant to represent the current state of lighting unit and,
as such, it updates the state of the unit every time it's public interface
is used to set a mutable attribute. This ostensibly keeps the state of the
object in sync with that of the unit, barring hardware issues. 

Ideally, this class should decouple the MCU's API from the implementation of
the hardware control. For instance, we may be using neopixel library to
interface with the lighting unit for now, but we may also choose to swap it with
another library down the line. This swap should have little to no impact on how
the API works. Essentially, the LightingUnit class is a wrapper around the
actual implementation of control over lighting unit. 

### Public methods:
These methods update the state of the lighting unit when called.
- set
- setColor
- setBrightness
- setPinOut
- setPixelCount