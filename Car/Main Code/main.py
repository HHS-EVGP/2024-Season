import adafruit_ads1x15.ads1115 as ADS
import adafruit_rfm9x
import board
import busio
import os
import time
import serial
import logging
from adafruit_ads1x15.analog_in import AnalogIn
from digitalio import DigitalInOut, Direction, Pull
from adafruit_lsm6ds.lsm6dsox import LSM6DSOX

#Setup & Configure RFM9x LoRa Radio
rfm9x = adafruit_rfm9x.RFM9x(busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO), DigitalInOut(board.CE1), DigitalInOut(board.D25), 433.0, high_power = True)
rfm9x.tx_power = 23
#Setup i2C & Devices
i2c = busio.I2C(board.SCL, board.SDA)
analogA = ADS.ADS1115(i2c, address = 72)
analogB = ADS.ADS1115(i2c, address = 72)
imu = LSM6DSOX(i2c, address = 72)
#Setup Analog In Ports
A0 = AnalogIn(analogA, ADS.P0) # motorTemp
A1 = AnalogIn(analogA, ADS.P1) # throttle
A2 = AnalogIn(analogA, ADS.P2) # brake
A3 = AnalogIn(analogA, ADS.P3) # battTemp1
B0 = AnalogIn(analogB, ADS.P0) # 
B1 = AnalogIn(analogB, ADS.P1) # 
B2 = AnalogIn(analogB, ADS.P2) # 
B3 = AnalogIn(analogB, ADS.P3) # 
#Setup UART for Cycle Anyalist
cycleAnalyst = serial.Serial('/dev/serial0',baudrate=9600)
#Setup variables
running = True
dataR = None
conter = 0
#Setup Logging
index = 1
while os.path.exists(f"/home/car/2024{index}.data.log"):
    index = index + 1
new_file_name = f"/home/car/2024/{index}.data.log"
logging.basicConfig(filename=new_file_name, filemode='w', format='%(message)s')

def imuPull():
    data = (
            str(round(imu.acceleration[0],2))
            +","+
            str(round(imu.acceleration[1],2))
            +","+
            str(round(imu.acceleration[2],2))
            +","+
            str(round(imu.gyro[0],2))
            +","+
            str(round(imu.gyro[1],2))
            +","+
            str(round(imu.gyro[2],2))
            )

    return f"imu,{data}|"

def UART():
    data = cycleAnalyst.read(10)
    print(bytes)
    print(data)
    return f"CA,Unknown,Unknown,Unknown,Unknown,Unknown|"

def analogPull():
    data  = f"motorTemp,{A0.value}|"
    data += f"throttle,{A1.value}|"
    data += f"brake,{A2.value}|"
    data += f"battTemp1,{A3.value}|"
    return data

def sendRF(data):

    print(data)

    rfm9x.send(bytearray(data,'utf-8'))

    logging.warning(data)

while running:

    data_2_send = "HHS|"
    data_2_send += analogPull()
    data_2_send += imuPull()
    data_2_send += UART()
    
    sendRF(data_2_send)
    time.sleep(0.25)


    
    
    