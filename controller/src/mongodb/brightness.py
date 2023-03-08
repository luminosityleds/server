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

def getBrightness(uuid: str):
        """ Getter for brightness state in the DB.  Stdout when method is instantiated and the values."""
        brightness = (collection.find_one(filter={'uuid' : f"{uuid}"}))["brightness"]
        print(f"INFO | GET | BRIGHTNESS: {brightness} | TIME: {datetime.datetime.now()}")
        return brightness

def setBrightness(uuid: str, value: int):
        """ Setter for brightness state in the DB.  Stdout when method is instantiated and the values."""
        if value > -1 and value < 101: 
                print(f"INFO | SET | BRIGHTNESS: {value} | TIME: {datetime.datetime.now()}")
                (collection.find_one_and_update(
                        {'uuid' : f"{uuid}"},
                        {'$set': {'brightness': value, 
                        'brightnessTimestamp' : datetime.datetime.now(),
                        'lastUpdated' : datetime.datetime.now()
                                }
                        },
                        return_document = ReturnDocument.AFTER
                ))
        else:
                print(f"ERROR | SET | BRIGHTNESS: {value} is not a valid hex brightness! | TIME: {datetime.datetime.now()}")
                raise Exception
