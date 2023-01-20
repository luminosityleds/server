# controller/src/board/credentials.py
from dataclasses import dataclass

@dataclass(frozen=True)
class WLANCredentials():
    """
    Represents the credentials associated with a WLAN connection.
    """
    ssid: str = None
    password: str = None
