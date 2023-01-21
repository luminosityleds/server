# controller/src/board/credentials.py

class WLANCredentials:
    """
    Manages the credentials associated with a WLAN connection. This includes
    storing and retrieving WLANCredentials.
    """
    _WLAN_CREDENTIALS_FILEPATH = None # where to save and load WLAN credentials

    class CredentialLoadError(Exception):
        pass

    def __init__(self, ssid: str = None, password: str = None):
        self._ssid = ssid
        self._password = password
    
    @classmethod
    def getLastCredentials(cls) -> object:
        """
        Retrieves the last WLAN credentials stored by the class.
        """
        print("Just a stub for now...")
        return None

    @classmethod
    def setLastCredentials(cls, credentials: object):
        """
        Stores the given WLAN credentials as the last used.
        """
        print("Just a stub for now...")

    @property
    def ssid(self):
        return self._ssid

    @property
    def password(self):
        return self._password

