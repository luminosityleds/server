from board import lights, wlan # type: ignore pylint: disable=E0401
from mongodb import powered, color, brightness, lightState # type: ignore pylint: disable=E0611
import secrets, time

def updateColorState():
    dbColorStateHEX = color.getColor('testtest')
    dbColorStateRGB = tuple(int(dbColorStateHEX.lstrip("#")[i:i+2], 16) for i in (0, 2, 4))
    if dbColorStateRGB != lights.getColor():
        lights.setColor(dbColorStateRGB)

def updateBrightnessState():
    dbBrightnessState = brightness.getBrightness('testtest')
    if dbBrightnessState != lights.getBrightness():
        lights.setBrightness(dbBrightnessState)

def updatePoweredState():
    dbPoweredState = bool(powered.getPowered('testtest'))
    if dbPoweredState != lights.getPowered():
        lights.setPowered(dbPoweredState)

def updateLightStateSlow():
    updateColorState()
    updateBrightnessState()
    updatePoweredState()

def updateLightStateFast():
    start = time.ticks_ms() # type: ignore pylint: disable=E0611
    dbLightState = lightState.getLightState('testtest')
    end = time.ticks_ms() # type: ignore pylint: disable=E0611
    if dbLightState != lights.getState():
        lights.setState(dbLightState)
    elapsed = time.ticks_diff(end, start)/1000
    return elapsed

def demonstrate(delay):
    elapsed = 0
    runs = 0
    while True:
        elapsed += updateLightStateFast()
        runs += 1
        print(f"AVERAGE CALL TIME: {elapsed / runs} seconds")
        time.sleep(delay)
