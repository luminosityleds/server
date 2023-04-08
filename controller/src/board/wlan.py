# wlan.py
import time
from .credentials import WLANCredentials
import os

if "rp2" in os.uname():
    import network # type: ignore pylint: disable=E0401
    import rp2 # type: ignore pylint: disable=E0401

else:
    from controller.test.mpstubs import network, rp2


# constants
_COUNTRY = 'US'
_ATTEMPTS = 10 # Number of times to check for a connection before giving up
_WAIT_TIME = 1 # Number of seconds to wait before next connection attempt
_WAIT_CODES  = [0, 1, 2] # cyw43 status codes indicating connection in progress
_CONNECTION_SUCCESS_CODE = 3 # cyw43 status code for successful connection

# fields
_credentials = WLANCredentials()
_wlan = network.WLAN(network.STA_IF) # init WLAN object as station interface

# exceptions
class WLANConnectionFailure(Exception):
    pass

class WLANConnectionTimeout(Exception):
    pass

class WLANConnectionActiveError(Exception):
    pass

# initialization
if _wlan.isconnected(): # if MCU is connected to a wlan prior to initialization
    try: # to load the last credentials
        _credentials = WLANCredentials.getLastCredentials()
    except WLANCredentials.CredentialLoadError as error:
        print("CredentialLoadError: unable to load last credentials...")

_wlan.active(True) # activate the network interface
rp2.country(_COUNTRY) # set the MCU's country code for the connection

# public methods
def connect(ssid: str, password: str) -> WLANCredentials:
    credentials = WLANCredentials(ssid, password)
    return connect(credentials)

def connect(ssid: str = None,
            password: str = None,
            credentials: WLANCredentials = 0) -> WLANCredentials:
    """
    Attempts to connect to the WLAN network specified by the given credentials.
    Raises an WLANConnectionError exception if unable to connect

    :return: the given WLANCredentials upon successful connection
    """

    if ssid and password:
        credentials = WLANCredentials(ssid, password)

    # check for already established connection
    if _wlan.isconnected():
        raise WLANConnectionActiveError(
            "attempting to connect to a WLAN when already connected to a WLAN")

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
        _credentials = credentials
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

def getCredentials() -> WLANCredentials:
    """
    Fetch WLANCredentials object from the current WLAN connection state.

    :return: WLANCredentials associated with current connection state
    """
    return _credentials
