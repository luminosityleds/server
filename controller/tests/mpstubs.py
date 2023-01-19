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
        connect_state = True
        status_code = 3
        def __init__(self, dummy=None):
            self.dummy = dummy

        def active(self, state: bool):
            pass

        def connect(self, ssid: str, password: str):
            pass

        def status(self):
            return network.WLAN.status_code

class rp2:
    """
    Container for for objects from the MicroPython library `rp2`.
    """
    def country(dummy=None):
        pass