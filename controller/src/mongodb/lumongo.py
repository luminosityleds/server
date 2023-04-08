# lumongo.py

"""A simple library for querying the LL database."""

# Imports based on environment (dev or embedded)
try: # to import uPy versions
        import urequests as requests # type: ignore pylint: disable=E0401
        import ucollections as collections # type: ignore pylint: disable=E0401
        import ujson as json # type: ignore pylint: disable=E0401
except ImportError: # import cPy version of requests 
        import requests # type: ignore pylint: disable=E0401
        import collections
        import json

try:
      from secrets import MONGO_DAPI_KEY # type: ignore pylint: disable=E0401,E0611
except ImportError: # to import secrets from secrets.py
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

DEFAULT_BODY = {
    'dataSource': DATA_SOURCE,
    'database': DATABASE,
    'collection': COLLECTION
}

def findOne(filter : dict, projection : dict = None) -> requests.Request:
    """Queries the LL database and returns the result."""
    body = _findOneRequestBody(filter, projection)
    response = requests.post(
        BASE_URL + "/action/findOne",
        headers=HEADERS,
        data=json.dumps(body)
        )
    return response

def updateOne(filter : dict, update : dict) -> requests.Request:
    """Updates the LL database."""
    body = _updateOneRequestBody(filter, update)
    response = requests.post(
        BASE_URL + "/action/updateOne",
        headers=HEADERS,
        data=json.dumps(body)
        )

    return response


# Request body generators
def _findOneRequestBody(filter : dict, projection : dict = None) -> dict:
    # uPy dict doesn't preserve order
    body = DEFAULT_BODY.copy()
    body["filter"] = filter
    
    if projection is not None:
          body['projection'] = projection

    return body

def _updateOneRequestBody(filter : dict, update : dict) -> dict:
    body = DEFAULT_BODY.copy()
    body["filter"] = filter
    body["update"] = update

    return body
