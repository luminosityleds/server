from machine import Pin # type: ignore pylint: disable=E0401

onboardLed = Pin("LED", Pin.OUT)

def toggleOnboardLed():
    if onboardLed.value() == 0:
        onboardLed.on()
    else:
        onboardLed.off()