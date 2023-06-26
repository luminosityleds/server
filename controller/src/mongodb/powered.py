from . import lumongo

def getPowered(uuid: str):
    """ Getter for powered state in the DB.  Stdout when method is instantiated and the values."""
    response = lumongo.findOne({"uuid": uuid}, {"powered": 1})
    powered = response.json()["document"]["powered"]
    print(f"INFO | GET | POWERED: {powered}")
    return powered

def setPowered(uuid: str, value: bool):
    """ Setter for powered state in the DB.  Stdout when method is instantiated and the values."""
    if isinstance(value, bool):
        print(f"INFO | SET | POWERED: {value}")
        response = lumongo.updateOne({"uuid": uuid}, {'$set': {'powered': value}})
    else:
        print(f"ERROR | SET | POWERED: {value} is not a valid powered value!")
        raise Exception
