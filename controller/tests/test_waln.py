import pytest
from dataclasses import dataclass
from controller.src.board import wlan, credentials

@pytest.fixture
def wlan_credentials():
    return credentials.WLANCredentials("ssid", "pass")

def test_connect_success(wlan_credentials):
    wlan._wlan.status_code = wlan._CONNECTION_SUCCESS_CODE
    assert wlan_credentials == wlan.connect(wlan_credentials)

def test_connect_failure():
    pass

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