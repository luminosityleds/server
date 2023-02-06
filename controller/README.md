# Source: https://www.learnpython.org/en/Hello%2C_World%21

Python is a very simple language, and has a very straightforward syntax. It encourages programmers to program without boilerplate (prepared) code. The simplest directive in Python is the "print" directive - it simply prints out a line (and also includes a newline, unlike in C).

There are two major Python versions, Python 2 and Python 3. Python 2 and 3 are quite different. This tutorial uses Python 3, because it more semantically correct and supports newer features.

The project will use Python 3.10.

For example, one difference between Python 2 and 3 is the print statement. In Python 2, the "print" statement is not a function, and therefore it is invoked without parentheses. However, in Python 3, it is a function, and must be invoked with parentheses.

To print a string in Python 3, just write:

`print("Hello World!")`

1. Make sure you are at the root of this directory
2. On the command line run, 
`python helloWorld.py`

The terminal should print 
`"Hello World!"`

### Creating a virtual environment
Virtual environments create isolated Python environments.  It allows you to install the necessary packages into the environment to be used exclusively by that virtual environment.

### Steps to create a virtual environment
1. Make sure you have python installed by typing `python` for Windows or `python3` for Mac.
Note: If you get an error while installing typing in python, follow the instructions to install python found here: https://luminosity-led.atlassian.net/wiki/spaces/LL/pages/262146/Setup+Dev+Environment
2. `cd controller`
3. Create the virtual environment with `python -m venv .venv` for Windows or `python3 -m venv .venv` for Mac
4. Activate the virtual environment with `source .venv/Scripts/activate`
5. Install the python modules in the requirements.txt with `pip install -r requirements.txt`.
6. You have setup your virtual environment and installed python modules into it. Use this virtual environment whenever developing for this directory to ensure that all packages are installed correctly.
7. Once you're done, deactivate the virtual environment with `deactivate`.

### Sphinx documentation
This guide outlines how to generate documentation with Sphinx for the Python code.
1. Follow the `Steps to create a virtual environment` section to setup a virtual environment. 
2. Go to the top level of the luminosity-led project with `cd $(git rev-parse --show-toplevel)`
3. Generate documentation with `sphinx-build -b html docs/source/ docs/build/html`
4. Open `docs/build/html/index.html` in a web browser and you should see Sphinx documentation.

### MicroPython: https://www.raspberrypi.com/documentation/microcontrollers/micropython.html
MicroPython is a version of Python created specifically for use on embedded systems.
This is what we will be using to program on the Raspberry Pi Pico W.

Since MicroPython packages are created specifically for use on embedded systems,
we can't easily install them on a pc through pip. That means that importing
a MicoPython package into embedded code on your pc will cause pylint to throw
an import error. You can place the following comment in your code on the same line
as the problematic import statement to ignore the error for that specific line:

`# pylint: disable=E0401`

[E0401](https://pylint.pycqa.org/en/latest/user_guide/messages/error/import-error.html) is pylint's error alerting you that it was unable to import a package.

### Connecting the Pico W to Wifi https://datasheets.raspberrypi.com/picow/connecting-to-the-internet-with-pico-w.pdf
To connect the Pico to a local wifi network, you can use the `wlan` and `credentials` provided by `board`.
Once you have synced your Pico with the `controller/src/`, you can use the following in a REPL to establish a connection:
```
from board import wlan
from board.credentials import WLANCredentials

creds = WLANCredentials("your_ssid", "your_password")
wlan.connect(creds)
```

Wlan will let you know if you are connected to the internet.
> Note: if the Pico is already connected to the network before wlan is initialized, the credentials stored will default to None for both ssid and password.

You can disconnect from the network with `wlan.disconnect()` and query the connection state with `wlan.connected()`.

### Querying the Wifi Connection State
To query the Wifi connection state, simply use the following method on the network interface object:
`wlan.isconnected()`

This returns true if the interface is connected, otherwise false.

### Device Commissioning

In order to enable the MCU to connect to the local wireless network, we need to somehow provide it with the networks credentials.
The current strategy to do this is to use SoftAp device commissioning, which involves using the MCU as an access point to a private WLAN.
The user connects to the MCU's WLAN and heads to a predetermined website hosted by the MCU. Here, the user is prompted to enter their network's credentials.
After that, the MCU closes the private WLAN connection and attempts to connect to the network with the given credentials. If it is unable to connect to the network,
the MCU will once again enter access point mode to allow the user to try again.

To start the device commissioning process, simply run `board.wlan.commission()`.
