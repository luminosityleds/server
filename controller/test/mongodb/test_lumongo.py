# test_lumongo.py

import pytest 
from src.mongodb.lumongo import findOneRequestBody,updateOneRequestBody, findOne, updateOne


def test_findOneRequestBody_noProjection():
    body = {
        "dataSource": "LuminosityCluster-0",
        "database": "Luminosity",
        "collection": "devices",
        "filter": {"uuid": "testtest"}
    }
    assert(findOneRequestBody({"uuid": "testtest"}) == body)

def test_findOneRequestBody_WithProjection():
    body = {
        "dataSource": "LuminosityCluster-0",
        "database": "Luminosity",
        "collection": "devices",
        "filter": {"uuid": "testtest"},
        "projection": {"brightness": 1}
    }
    assert(findOneRequestBody({"uuid": "testtest"}, {"brightness": 1}) == body)

def test_updateOneRequestBody():
    body = {
        "dataSource": "LuminosityCluster-0",
        "database": "Luminosity",
        "collection": "devices",
        "filter": {"uuid": "testtest"},
        "update": {"$set": {'brightness': 10}}
    }
    assert(updateOneRequestBody(
        {"uuid": "testtest"},
        {"$set": {'brightness': 10}}
        ))

# The following simply test if mongodb accepts the queries. Actual data mutation
# tests are left to the individual mutation methods.
def test_findOne_noProjection():
    response = findOne({"uuid": "testtest"})

def test_findOne_withProjection():
    response = findOne({"uuid": "testtest"}, {"connected": 1})

def test_updateOne():
    originalValue = findOne({"uuid": "testtest"}, {"connected": 1})
    # set the attribute to its original value to maintain state for other tests
    response = updateOne({"uuid": "testtest"}, {'$set': {'connected': originalValue}})
