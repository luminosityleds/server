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

def getColor(uuid: str):
        """ Getter for color state in the DB.  Stdout when method is instantiated and the values."""
        color = (collection.find_one(filter={'uuid' : f"{uuid}"}))["color"]
        print(f"INFO | GET | COLOR: {color} | TIME: {datetime.datetime.now()}")
        return color

def setColor(uuid: str, value: str):
        """ Setter for color state in the DB.  Stdout when method is instantiated and the values."""
        if len(value) == 7: 
                print(f"INFO | SET | COLOR: {value} | TIME: {datetime.datetime.now()}")
                (collection.find_one_and_update(
                        {'uuid' : f"{uuid}"},
                        {'$set': {'color': f"{value}", 
                        'colorTimestamp' : datetime.datetime.now(),
                        'lastUpdated' : datetime.datetime.now()
                                }
                        },
                        return_document = ReturnDocument.AFTER
                ))
        else:
                print(f"ERROR | SET | COLOR: {value} is not a valid hex color! | TIME: {datetime.datetime.now()}")
                raise Exception
