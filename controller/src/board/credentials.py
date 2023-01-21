# controller/src/board/credentials.py

class WLANCredentials:
    """
    Represents the credentials associated with a WLAN connection.
    """
    def __init__(self, ssid: str = None, password: str = None):
        self._ssid = ssid
        self._password = password
    
    @property
    def ssid(self):
        return self._ssid

    @property
    def password(self):
        return self._password
