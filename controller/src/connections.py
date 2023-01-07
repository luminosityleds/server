# connections.py
import network # pylint: disable=E0401
import time

class WLANConnection:
    """
    A class representing a WLAN connection between the device and a local
    network.
    """

    # Class Constants
    TRIES = 10 # Number of times to attempt a connection before giving up
    WAIT_TIME = 1 # Number of seconds to wait before next connection attempt
    WAIT_CODES  = [1, 2] # cyw43 status codes indicating connection in progress
    CONNECTION_SUCCESS = 3 # cyw43 status code for successful connection

    def __init__(self, ssid: str, password: str) -> None:
        """
        Constructor method for creating a WLANConnection object.

        :param ssid: the target wifi network's service set identifier (name)
        :param password: the target wifi network's password
        """
        self._ssid = ssid
        self._password = password
        self._wlan = network.WLAN(network.STA_IF) # init WLAN object as station

    def connect(self) -> None:
        """
        Connect to the WLAN network specified by the object's ssid parameter.
        """
        self._wlan.active(True) # activate the network interface
        self._wlan.connect(self._ssid, self._password)

        # Wait for a connection to be established
        for i in range(WLANConnection.TRIES):

            if self._wlan.status() not in WLANConnection.WAIT_CODES:
                break
            print("establishing connection...")
            time.sleep(WLANConnection.WAIT_TIME)

        # Connection failure
        if self._wlan.status() != WLANConnection.CONNECTION_SUCCESS:
            self._wlan.active(False) # deactivate the network interface
            raise RuntimeError("network connection failed, status " 
                + str(self._wlan.status()))

        # Connection success
        else:
            print("connection established\n")

    def disconnect(self) -> None:
        """
        Disconnect from current wireless network.
        """
        self._wlan.disconnect()

    @property
    def connected(self) -> bool:
        """
        Query the state of the WLAN connection.

        :return: True if the device is connected to a WLAN, else False
        """
        return self._wlan.isconnected()

    @property
    def ssid(self) -> str:
        """
        The ssid of the current connection.
        """
        return self._ssid
    
    @ssid.setter
    def ssid(self, ssid: str) -> None:
        """
        Attempts to set the ssid of the connection, granted the connection
        status is False (disconnected). Raises RuntimeError if this is 
        attempted on an open connection.

        :param ssid: The ssid of the target WLAN
        """
        if self.connected == False:
            raise RuntimeError(
                "attempting to change the ssid of an active connection")
        else:
            self._ssid = ssid

    @property
    def password(self) -> None:
        """
        The password of the current connection.
        """
        # For security reasons, does NOT return the password
        # This is here in order to use the setter decorator
        return None

    @password.setter
    def password(self, password: str) -> None:
        """
        Attempts to set the password of the connection, granted the connection
        status is False (disconnected). Raises RuntimeError if this is 
        attempted on an open connection.
        """
        if self.connected == False:
            raise RuntimeError(
                "attempting to change the password of an active connection")
        else:
            self._password = password