import pytest 
from src.mongodb.brightness import setBrightness, getBrightness

def test_getBrightness():
    assert(getBrightness('testtest')) == 100

def test_setBrightness():
    setBrightness('testtest', 40)
    assert(getBrightness('testtest')) == 40
    setBrightness('testtest', 100)

def test_setBrightness_invalid():
    with pytest.raises(Exception):
        setBrightness('testtest', -1)
        setBrightness('testtest', 101)
