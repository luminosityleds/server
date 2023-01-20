import pytest
from unittest.mock import patch
from controller.src.board import wlan, credentials

CYW43_STATUS_CODES = {
    "CYW43_LINK_BADAUTH": -3,
    "CYW43_LINK_NONET": -2, # No matching SSID found (out of range or down) 
    "CYW43_LINK_FAIL": -1,
    "CYW43_LINK_DOWN": 0,
    "CYW43_LINK_JOIN": 1,
    "CYW43_LINK_NOIP": 2,
    "CYW43_LINK_UP": 3
}

test_credentials = credentials.WLANCredentials("id", "pass")

def test_connect_success():
    wlan._wlan.status_code = CYW43_STATUS_CODES["CYW43_LINK_UP"]
    assert test_credentials == wlan.connect(test_credentials)

def test_connect_failure():
    for key in ["CYW43_LINK_FAIL", "CYW43_LINK_NONET", "CYW43_LINK_BADAUTH"]:
        wlan._wlan.status_code = CYW43_STATUS_CODES[key]
        with pytest.raises(wlan.WLANConnectionFailure):
            wlan.connect(test_credentials)

@patch('time.sleep', return_value=None)
def test_connect_timeout(patched_time_sleep):
    for key in ["CYW43_LINK_DOWN", "CYW43_LINK_JOIN", "CYW43_LINK_NOIP"]:
        wlan._wlan.status_code = CYW43_STATUS_CODES[key]
        with pytest.raises(wlan.WLANConnectionTimeout):
            wlan.connect(test_credentials)

def test_connect_bad_arg():
    with pytest.raises(TypeError):
        wlan.connect("these are not credentials")

def test_connect_already_connected():
    pass

def test_disconnect_connected():
    pass

def test_disconnect_non_connected():
    pass

def test_getCredentials():
    pass

def test_connected_true():
    pass

def test_connected_false():
    pass