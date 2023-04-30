# main.py

# Demo for updating light state to db state
from board import lights
from board import mongodb

def updateColorState():
    dbColorStateHEX = mongodb.color.getColor()
    dbColorStateRGB = tuple(int(dbColorStateHEX[i:i+2], 16) for i in (0, 2, 4))
    if dbColorStateRGB != lights.getColor():
        lights.setColor(dbColorStateRGB)

def updateBrightnessState():
    dbBrightnessState = mongodb.brightness.getBrightness()
    if dbBrightnessState != lights.getBrightness():
        lights.setBrightness(dbBrightnessState)

def updatePoweredState():
    dbPoweredState = mongodb.powered.getPowered()
    if dbPoweredState != lights.getPowered():
        lights.setPowered(dbPoweredState)
