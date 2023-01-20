import pytest
from dataclasses import dataclass
from controller.src.board import wlan, credentials

CYW43_STATUS_CODES = {
    "CYW43_LINK_BADAUTH": -3,
    "CYW43_LINK_NONET": -2,
    "CYW43_LINK_FAIL": -1,
    "CYW43_LINK_DOWN": 0,
    "CYW43_LINK_JOIN": 1,
    "CYW43_LINK_NOIP": 2,
    "CYW43_LINK_UP": 3
}

@pytest.fixture
def wlan_credentials():
    return credentials.WLANCredentials("ssid", "pass")

def test_connect_success(wlan_credentials):
    wlan._wlan.status_code = CYW43_STATUS_CODES["CYW43_LINK_UP"]
    assert wlan_credentials == wlan.connect(wlan_credentials)

def test_connect_failure(wlan_credentials):
    for key in ["CYW43_LINK_FAIL", "CYW43_LINK_NONET", "CYW43_LINK_BADAUTH"]:
        wlan._wlan.status_code = key
        with pytest.raises(wlan.WLANConnectionError):
            wlan.connect(wlan_credentials)


def test_connect_bad_arg():
    pass

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