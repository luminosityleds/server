import requests # type: ignore pylint: disable=E0401
from src.secrets import MONGO_URL, MONGO_API_KEY # type: ignore pylint: disable=E0401

def getBrightness(uuid: str):
        """ Getter for brightness state in the DB.  Stdout when method is instantiated and the values."""
        headers = {
        "api-key": f"{MONGO_API_KEY}",
        "Content-Type": "application/json"
        }

        body = {
                "dataSource": "LuminosityCluster-0",
                "database": "Luminosity",
                "collection": "devices",
                "filter": {"uuid": "testtest"},
                "projection": {"brightness": 1}
        }

        response = requests.post(MONGO_URL + "/action/findOne", headers=headers, json=body)
        print(response)
        brightness = response.json()["document"]["brightness"]

        print(f"INFO | GET | BRIGHTNESS: {brightness}")
        return brightness

def setBrightness(uuid: str, value: int):
        """ Setter for brightness state in the DB.  Stdout when method is instantiated and the values."""
        if value > -1 and value < 101: 
                print(f"INFO | SET | BRIGHTNESS: {value}")

                headers = {
                "api-key": f"{MONGO_API_KEY}",
                "Content-Type": "application/json"
                }

                body = {
                        "dataSource": "LuminosityCluster-0",
                        "database": "Luminosity",
                        "collection": "devices",
                        "filter": {"uuid": "testtest"},
                        "update": {"$set": {'brightness': value}}
                }

                response = requests.post(MONGO_URL+ "/action/updateOne", headers=headers, json=body)
        else:
                print(f"ERROR | SET | BRIGHTNESS: {value} is not a valid brightness value!")
                raise Exception
