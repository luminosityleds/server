from . import lumongo

def getConnected(uuid: str):
    """ Getter for connected state in the DB.  Stdout when method is instantiated and the values."""
    response = lumongo.findOne({"uuid": uuid}, {"connected": 1})
    connected = response.json()["document"]["connected"]
    print(f"INFO | GET | CONNECTED: {connected}")
    return connected

def setConnected(uuid: str, value: bool):
    """ Setter for connected state in the DB.  Stdout when method is instantiated and the values."""
    if isinstance(value, bool):
        print(f"INFO | SET | CONNECTED: {value}")
        response = lumongo.updateOne({"uuid": uuid}, {'$set': {'connected': value}})
    else:
        print(f"ERROR | SET | CONNECTED: {value} is not a valid connected value!")
        raise Exception
