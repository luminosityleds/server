# connections.py

import network # type: ignore pylint: disable=E0401
import rp2 # type: ignore pylint: disable=E0401
import time # translates to utime in MicroPython upon evaluation
import json

WLAN_CREDENTIALS_FILEPATH = "../.data/wlan-credentials.json"

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
        self._credentials = [ssid, password]
        self._wlan = network.WLAN(network.STA_IF) # init WLAN object as station

    def __eq__(self, other: object) -> bool:
        return (self._wlan == other._wlan)

    def __str__(self) -> str:
        interfaceParams = self._wlan.ifconfig()

        return f"""
                WLAN Connection:
                    SSID: {self._ssid}
                    Connected: {self.connected}
                    Connection Status: {self._wlan.status()}
                    IP: {interfaceParams[0]}
                    Subnet Mask: {interfaceParams[1]}
                    Gateway: {interfaceParams[2]}
                    DNS Server: {interfaceParams[3]}
                    Country: {rp2.country()}
                """

    def __repr__(self) -> str:
        return f"WLANConnection(ssid='{self._credentials[0]}', " \
            f"password='{self._credentials[1]}')"

    @classmethod
    def fromJSON(cls) -> object:
        """
        Attempts create a WLANConnection instance from prior instance,
        if available.

        :return: WLANConnection instance or None, if not available
        """
        try:
            with open(WLAN_CREDENTIALS_FILEPATH, "r") as file:
                jsonString = file.read()
                file.close()
                print(jsonString)
                args = json.loads(jsonString)
                connection = WLANConnection(args[0], args[1])
                return connection

        except OSError as error:
            if error.errno == 2:
                return None
            else:
                raise error
    
    def toJSON(self, path=WLAN_CREDENTIALS_FILEPATH) -> None:
        """
        Saves WLANConnection instance to the json file specified.

        :param path: filepath at which to save WLANConnection instance
        """
        with open(WLAN_CREDENTIALS_FILEPATH, "w") as file:
            args = [self.ssid, self.password]
            jsonString = json.dumps(args)
            file.write(jsonString)
            file.close()

    def connect(self) -> None:
        """
        Connect to the WLAN network specified by the object's ssid parameter.
        """
        self._wlan.active(True) # activate the network interface
        self._wlan.connect(self._credentials[0], self._credentials[1])

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
            self.toJSON # save object instance for use at a later time
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
        return self._credentials[0]
    
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
            self._credentials[0] = ssid

    @property
    def password(self) -> None:
        """
        The password of the current connection.
        """
        return self._credentials[1]

    @password.setter
    def password(self, password: str) -> None:
        """
        Attempts to set the password of the connection, granted the connection
        status is False (disconnected). Raises RuntimeError if this is 
        attempted on an open connection.

        :param password: the password for the target WLAN
        """
        if self.connected == False:
            raise RuntimeError(
                "attempting to change the password of an active connection")
        else:
            self._credentials[1] = password
