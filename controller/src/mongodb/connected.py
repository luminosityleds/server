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

def getConnected(uuid: str):
        """ Getter for connected state in the DB.  Stdout when method is instantiated and the values."""
        connected = (collection.find_one(filter={'uuid' : f"{uuid}"}))["connected"]
        print(f"INFO | GET | CONNECTED: {connected} | TIME: {datetime.datetime.now()}")
        return connected

def setConnected(uuid: str, value: bool):
        """ Setter for connected state in the DB.  Stdout when method is instantiated and the values."""
        try:
                print(f"INFO | SET | CONNECTED: {value} | TIME: {datetime.datetime.now()}")
                (collection.find_one_and_update(
                        {'uuid' : f"{uuid}"},
                        {'$set': {'connected': value, 
                        'connectedTimestamp' : datetime.datetime.now(),
                        'lastUpdated' : datetime.datetime.now()
                                }
                        },
                        return_document = ReturnDocument.AFTER
                ))
        except Exception:
                print(f"ERROR | SET | CONNECTED: {value} is not a valid connected value! | TIME: {datetime.datetime.now()}")
                raise Exception
