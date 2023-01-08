# boot.py - - runs on boot-up
import rp2 # type: ignore pylint: disable=E0401

rp2.country = 'US' # Set country to avoid issues with certain WLAN networks