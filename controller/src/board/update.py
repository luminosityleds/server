from board import lights, wlan
from mongodb import powered, color, brightness
import secrets, time

def updateColorState():
    dbColorStateHEX = mongodb.color.getColor('testtest')
    dbColorStateRGB = tuple(int(dbColorStateHEX[i:i+2], 16) for i in (0, 2, 4))
    if dbColorStateRGB != lights.getColor():
        lights.setColor(dbColorStateRGB)

def updateBrightnessState():
    dbBrightnessState = mongodb.brightness.getBrightness('testtest')
    if dbBrightnessState != lights.getBrightness():
        lights.setBrightness(dbBrightnessState)

def updatePoweredState():
    dbPoweredState = mongodb.powered.getPowered('testtest')
    if dbPoweredState != lights.getPowered():
        lights.setPowered(dbPoweredState)

def updateLightState():
    updateColorState()
    updateBrightnessState()
    updatePoweredState()
