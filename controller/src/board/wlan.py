# wlan.py
import time
from .credentials import WLANCredentials

try: # importing MicroPython-specific libraries
    from network import WLAN, STA_IF # type: ignore pylint: disable=E0401
    import rp2 # type: ignore pylint: disable=E0401

except ImportError: #import stubs
    from controller.tests.mpstubs import network, rp2

# constants
_COUNTRY = 'US'
_ATTEMPTS = 10 # Number of times to check for a connection before giving up
_WAIT_TIME = 1 # Number of seconds to wait before next connection attempt
_WAIT_CODES  = [0, 1, 2] # cyw43 status codes indicating connection in progress
_CONNECTION_SUCCESS_CODE = 3 # cyw43 status code for successful connection

# fields
_credentials = WLANCredentials()
_wlan = network.WLAN(network.STA_IF) # init WLAN object as station interface

class WLANConnectionFailure(Exception):
    pass

class WLANConnectionTimeout(Exception):
    pass

# initialization
_wlan.active(True) # activate the network interface
rp2.country(_COUNTRY) # set the MCU's country code for the connection

# public methods
def connect(credentials: WLANCredentials) -> WLANCredentials:
    """
    Attempts to connect to the WLAN network specified by the given credentials.
    Raises an WLANConnectionError exception if unable to connect

    :returns: the given WLANCredentials upon successful connection
    """
    # check argument type
    if isinstance(credentials, WLANCredentials) == False:
        raise TypeError("credentials must be of type WLANCredentials")

    _wlan.connect(credentials.ssid, credentials.password)
    for attempt in range(_ATTEMPTS):
            if _wlan.status() not in _WAIT_CODES:
                break
            print("establishing connection...")
            time.sleep(_WAIT_TIME)

    # connection timeout
    if _wlan.status() in _WAIT_CODES:
        raise WLANConnectionTimeout(
            f"connection timeout, status: {_wlan.status()}")

    # connection fail
    elif _wlan.status() != _CONNECTION_SUCCESS_CODE:
        raise WLANConnectionFailure(
        f"connection failed, status: {_wlan.status()}")

    # connection success
    else:
        print("connection established\n")
        return credentials

def disconnect() -> None:
    """
    Disconnect from current wireless network.
    """
    _wlan.disconnect()

def connected() -> bool:
    """
    Query the state of the WLAN connection.

    :return: True if the device is connected to a WLAN, else False
    fi"""
    return _wlan.isconnected()