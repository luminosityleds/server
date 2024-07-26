from . import lumongo

def getColor(uuid: str) -> str:
    """ Getter for color state in the DB.  Stdout when method is instantiated and the values."""
    response = lumongo.findOne({"uuid": uuid}, {"color": 1})
    color = response.json()["document"]["color"] if not None else "NONE"
    print(f"INFO | GET | COLOR: {color}")
    return color

def setColor(uuid: str, value: str):
    """ Setter for color state in the DB.  Stdout when method is instantiated and the values."""
    if len(value) == 7: 
        print(f"INFO | SET | COLOR: {value}")
        response = lumongo.updateOne({"uuid": uuid}, {'$set': {'color': value}})

    else:
            print(f"ERROR | SET | COLOR: {value} is not a valid color value!")
            raise Exception
