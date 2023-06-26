# lightState.py
from . import lumongo

def getLightState(uuid) -> dict:
    """Gets the following states from the db: powered, color, brightness

    returns dict with keys powered, color, brightness
    """
    response = lumongo.findOne({"uuid": uuid}, {"powered": 1, "color": 1, "brightness": 1})
    powered = bool(response.json()["document"]["powered"])
    color = response.json()["document"]["color"]
    brightness = response.json()["document"]["brightness"]
    state = {
        "powered": powered,
        "color": color,
        "brightness": brightness
    }
    print(f"INFO | GET | POWERED: {powered}")
    print(f"INFO | GET | COLOR: {color}")
    print(f"INFO | GET | BRIGHTNESS: {brightness}")
    return state