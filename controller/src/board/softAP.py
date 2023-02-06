import network # type: ignore pylint: disable=E0401
from board.credentials import WLANCredentials

_AP_ESSID = "LuminosityLEDs" # essid for the access point, when needed
_AP_PASSWORD = "temporary_password" # password for the access point

def run() -> WLANCredentials:
    _ap = network.WLAN(network.AP_IF) # set WLAN to access point interface
    _ap.config(essid=_AP_ESSID, password=_AP_PASSWORD)

    _ap.active(True)

    while _ap.active == False: # wait until AP is active
        pass

    print(_ap.ifconfig())
