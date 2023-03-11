import pytest 
from src.mongodb.color import setColor, getColor

def test_getColor():
    assert(getColor('testtest')) == '#000000'

def test_setColor():
    setColor('testtest', '#ff3ff9')
    assert(getColor('testtest')) == '#ff3ff9'
    setColor('testtest', '#000000')

def test_setColor_invalid():
    with pytest.raises(Exception):
        setColor('testtest', '#wrong_color')