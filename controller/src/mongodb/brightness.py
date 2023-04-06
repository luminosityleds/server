from . import lumongo

def getBrightness(uuid: str):
    """Getter for brightness state in the DB.  Stdout when method is instantiated and the values."""
    response = lumongo.findOne({"uuid": uuid}, {"brightness": 1})
    brightness = response["brightness"]

    print(f"INFO | GET | BRIGHTNESS: {brightness}")
    return brightness

def setBrightness(uuid: str, value: int):
    """ Setter for brightness state in the DB.  Stdout when method is instantiated and the values."""
    if value > -1 and value < 101: 
        print(f"INFO | SET | BRIGHTNESS: {value}")

        response = lumongo.updateOne({"uuid": uuid}, {'$set': {'brightness': value}})
    else:
        print(f"ERROR | SET | BRIGHTNESS: {value} is not a valid brightness value!")
        raise Exception
