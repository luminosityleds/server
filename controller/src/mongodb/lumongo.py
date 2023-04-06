# lumongo.py

"""A simple library for querying the LL database."""

# Imports based on environment (dev or embedded)
try: # to import uPy version of requests
        import urequests as requests # type: ignore pylint: disable=E0401
except ImportError: # import cPy version of requests
        import requests # type: ignore pylint: disable=E0401

try: # to import secrets from secrets.py
        from src.secrets import MONGO_DAPI_KEY # type: ignore pylint: disable=E0401,E0611
except ImportError: # import from environment instead (GH workflow)
        try:
                import os
                MONGO_DAPI_KEY = f'{os.environ["MONGO_DAPI_KEY"]}'
        except AttributeError:
                pass

# Constants
BASE_URL = "https://data.mongodb-api.com/app/data-nobwt/endpoint/data/v1"
API_KEY = MONGO_DAPI_KEY
DATA_SOURCE = "LuminosityCluster-0"
DATABASE = "Luminosity"
COLLECTION = "devices"
HEADERS = {
    "api-key": f"{MONGO_DAPI_KEY}",
    "Content-Type": "application/json"
    }


def findOne(filter : dict, projection : dict = None) -> dict:
    """Queries the LL database and returns the result."""
    body = _findOneRequestBody(filter, projection)
    response = requests.post(
        BASE_URL + "/action/findOne", 
        headers=HEADERS,
        json=body
        )

    return response.json()["document"]

def updateOne(filter : dict, update : dict) -> dict:
    """Updates the LL database."""
    body = _updateOneRequestBody(filter, update)
    response = requests.post(
        BASE_URL + "/action/updateOne", 
        headers=HEADERS,
        json=body
        )

    return response


# Request body generators
def _findOneRequestBody(filter : dict, projection : dict = None) -> dict:
    if projection is None:
        body = {
            "dataSource": DATA_SOURCE,
            "database": DATABASE,
            "collection": COLLECTION,
            "filter": filter
        }
    else:
        body = {
            "dataSource": DATA_SOURCE,
            "database": DATABASE,
            "collection": COLLECTION,
            "filter": filter,
            "projection": projection
        }

    return body

def _updateOneRequestBody(filter : dict, update : dict) -> dict:
    body = {
        "dataSource": DATA_SOURCE,
        "database": DATABASE,
        "collection": COLLECTION,
        "filter": filter,
        "update": update
    }

    return body
