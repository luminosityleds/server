try: # to import uPy version of requests
        import urequests # type: ignore pylint: disable=E0401
except ModuleNotFoundError: # import cPy version of requests
        import requests # type: ignore pylint: disable=E0401

try: # to import secrets from secrets.py
        from src.secrets import MONGO_DAPI_KEY # type: ignore pylint: disable=E0401,E0611
except ModuleNotFoundError: # import from environment instead (GH workflow)
        import os
        MONGO_DAPI_KEY = f'{os.environ["MONGO_DAPI_KEY"]}'


BASE_URL = "https://data.mongodb-api.com/app/data-nobwt/endpoint/data/v1"

def getBrightness(uuid: str):
        """ Getter for brightness state in the DB.  Stdout when method is instantiated and the values."""
        headers = {
        "api-key": f"{MONGO_DAPI_KEY}",
        "Content-Type": "application/json"
        }

        body = {
                "dataSource": "LuminosityCluster-0",
                "database": "Luminosity",
                "collection": "devices",
                "filter": {"uuid": "testtest"},
                "projection": {"brightness": 1}
        }

        response = requests.post(BASE_URL + "/action/findOne", headers=headers, json=body)
        print(response)
        brightness = response.json()["document"]["brightness"]

        print(f"INFO | GET | BRIGHTNESS: {brightness}")
        return brightness

def setBrightness(uuid: str, value: int):
        """ Setter for brightness state in the DB.  Stdout when method is instantiated and the values."""
        if value > -1 and value < 101: 
                print(f"INFO | SET | BRIGHTNESS: {value}")

                headers = {
                "api-key": f"{MONGO_DAPI_KEY}",
                "Content-Type": "application/json"
                }

                body = {
                        "dataSource": "LuminosityCluster-0",
                        "database": "Luminosity",
                        "collection": "devices",
                        "filter": {"uuid": "testtest"},
                        "update": {"$set": {'brightness': value}}
                }

                response = requests.post(BASE_URL+ "/action/updateOne", headers=headers, json=body)
        else:
                print(f"ERROR | SET | BRIGHTNESS: {value} is not a valid brightness value!")
                raise Exception
