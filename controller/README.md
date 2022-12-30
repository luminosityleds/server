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

1. Make sure you are at the root of this directory
2. On the command line run, 
`python helloWorld.py`

The terminal should print 
`"Hello World!"`

### Creating a virtual environment
Virtual environments create isolated Python environments.  It allows you to install the necessary packages into the environment to be used exclusively by that virtual environment.

### Steps to create a virtual environment
1. Make sure you have python installed by `typing python`.
Note: If you get an error while installing typing in python, follow the instructions to install python found here: https://luminosity-led.atlassian.net/wiki/spaces/LL/pages/262146/Setup+Dev+Environment
2. `cd controller`
3. Create the virtual environment with `python -m venv .venv`
4. Activate the virtual environment with `source .venv/Scripts/activate`
5. Install the python modules in the requirements.txt with `pip install -r requirements.txt`.
6. You have setup your virtual environment and installed python modules into it.
7. Deactivate the virtual environment with `deactivate`.
