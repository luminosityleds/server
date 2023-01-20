# mpstubs.py
"""
A module containing stubs for salient MicroPython libraries, as needed for 
unit tests.
"""

class network:
    """
    Container for objects from the MicroPython library `network`.
    """
    STA_IF = None

    class WLAN:
        """
        Mock the MicroPython network.WLAN class for testing purposes.
        """
        def __init__(self, interface):
            self.interface = interface
            self.status_code = 3
            self.connect_state = True

        def active(self, state: bool):
            pass

        def connect(self, ssid: str, password: str):
            return self.status_code

        def status(self):
            return self.status_code

        def isconnected(self):
            return self.connect_state

        def disconnect(self):
            self.connect_state = False

class rp2:
    """
    Container for for objects from the MicroPython library `rp2`.
    """
    def country(dummy=None):
        pass