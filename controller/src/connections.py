import network # pylint: disable=E0401
import time

class WLANConnection:
    """
    A class representing a wifi connection.
    """
    """
        Constructor method for creating a LightingUnit object.

        :param ssid: the target wifi network's service set identifier (name)
        :param password: the target wifi network's password
        """
    def __init__(self, ssid: str, password: str) -> None:
        self._ssid = ssid
        self._password = password
        self._wlan = network.WLAN(network.STA_IF) # init WLAN object as station