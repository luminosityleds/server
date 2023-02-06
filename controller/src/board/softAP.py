"""
A SoftAP implementation of device commissioning based on [Michael Horne's
approach](https://www.recantha.co.uk/blog/?p=21398).
"""

import network # type: ignore pylint: disable=E0401
from .credentials import WLANCredentials
from . import tinyweb as tinyweb

_AP_ESSID = "LuminosityLEDs" # essid for the access point, when needed
_AP_PASSWORD = "temporary_password" # password for the access point

def run() -> WLANCredentials:
    _ap = network.WLAN(network.AP_IF) # set WLAN to access point interface
    _ap.config(essid=_AP_ESSID, password=_AP_PASSWORD)

    _ap.active(True) # activate interface

    while _ap.active == False: # wait until AP is active
        pass

    print(_ap.ifconfig())

    app = tinyweb.webserver()

    # Serve a simple Hello World! response when / is called
    # and turn the LED on/off using toggle()
    @app.route('/')
    async def index(request, response):
        # Start HTTP response with content-type text/html
        await response.start_html()
        # Send actual HTML page
        await response.send('<html><body><h1>Hello, world!</h1></body></html>\n')

    # Run the web server as the sole process
    app.run(host="0.0.0.0", port=80)
