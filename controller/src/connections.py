# connections.py
import network # pylint: disable=E0401
import time

class WLANConnection:
    """
    A class representing a wifi connection.
    """

    # Constants
    TRIES = 10 # Number of times to attempt a connection before giving up
    WAIT_TIME = 1 # Number of seconds to wait before next connection attempt
    WAIT_CODES  = [1, 2] # cyw43 status codes indicating connection in progress
    CONNECTION_SUCCESS = 3 # cyw43 status code for successful connection

    def __init__(self, ssid: str, password: str) -> None:
        """
        Constructor method for creating a LightingUnit object.

        :param ssid: the target wifi network's service set identifier (name)
        :param password: the target wifi network's password
        """
        self._ssid = ssid
        self._password = password
        self._wlan = network.WLAN(network.STA_IF) # init WLAN object as station

    def connect(self) -> None:
        """
        Connect to the WiFi network specified by the object's ssid parameter.
        """
        self._wlan.active(True) # activate the network interface
        self._wlan.connect(self._ssid, self._password)

        # Wait for a connection to be established or a failure
        for i in range(WLANConnection.TRIES):
            if self._wlan.status() not in WLANConnection.WAIT_CODES:
                break
            print("establishing connection...")
            time.sleep(WLANConnection.WAIT_TIME)

        #connection failure
        if self._wlan.status() != WLANConnection.CONNECTION_SUCCESS:
            raise RuntimeError("network connection failed, status " 
                + str(self._wlan.status()))

        else:
            print("connection established\n")