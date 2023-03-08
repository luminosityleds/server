import pytest 
from src.mongodb.powered import setPowered, getPowered

def test_getPowered():
    assert(getPowered('testtest')) == False

def test_setPowered():
    setPowered('testtest', True)
    assert(getPowered('testtest')) == True
    setPowered('testtest', False)

def test_setPowered_invalid():
    with pytest.raises(Exception):
        setPowered('testtest', 'wrong')
        setPowered('testtest', 1337)