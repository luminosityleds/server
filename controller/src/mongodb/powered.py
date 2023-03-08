import os
import pymongo
from pymongo.collection import ReturnDocument
import certifi
import datetime

# CA certificate needed to connect to MongoDB
ca = certifi.where()

# MongoDB Connection
mongo = pymongo.MongoClient(f'{os.environ["MONGO_URL"]}',
         tlsCAFile=ca)
db = mongo.Luminosity
collection = db.devices

def getPowered(uuid: str):
        """ Getter for powered state in the DB.  Stdout when method is instantiated and the values."""
        powered = (collection.find_one(filter={'uuid' : f"{uuid}"}))["powered"]
        print(f"INFO | GET | POWERED: {powered} | TIME: {datetime.datetime.now()}")
        return powered

def setPowered(uuid: str, value: bool):
        """ Setter for powered state in the DB.  Stdout when method is instantiated and the values."""
        try:
                print(f"INFO | SET | POWERED: {value} | TIME: {datetime.datetime.now()}")
                (collection.find_one_and_update(
                        {'uuid' : f"{uuid}"},
                        {'$set': {'powered': value, 
                        'poweredTimestamp' : datetime.datetime.now(),
                        'lastUpdated' : datetime.datetime.now()
                                }
                        },
                        return_document = ReturnDocument.AFTER
                ))
        except Exception:
                print(f"ERROR | SET | POWERED: {value} is not a valid powered value! | TIME: {datetime.datetime.now()}")
                raise Exception
