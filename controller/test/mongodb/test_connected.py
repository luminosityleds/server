import pytest 
from src.mongodb.connected import setConnected, getConnected

def test_getConnected():
    assert(getConnected('testtest')) == True

def test_setConnected():
    setConnected('testtest', False)
    assert(getConnected('testtest')) == False
    setConnected('testtest', True)

def test_setConnected_invalid():
    with pytest.raises(Exception):
        setConnected('testtest', 'wrong')
        setConnected('testtest', 1337)