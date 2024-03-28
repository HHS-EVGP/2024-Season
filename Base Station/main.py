# SPDX-FileCopyrightText: 2018 Brent Rubell for Adafruit Industries
# SPDX-License-Identifier: MIT
# Wiring Check, Pi Radio w/RFM9x
# Learn Guide: https://learn.adafruit.com/lora-and-lorawan-for-raspberry-pi
# Author: Brent Rubell for Adafruit Industries

# Last updated on 1/23/2024 

import adafruit_rfm9x
import board
import busio
import csv
import os
import time
from datetime import datetime
from digitalio import DigitalInOut, Direction, Pull


# Create the I2C interface.
i2c = busio.I2C(board.SCL, board.SDA)

# Configure RFM9x LoRa Radio
CS = DigitalInOut(board.CE1)
RESET = DigitalInOut(board.D25)
spi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)
spi = busio.SPI(board.SCK, MOSI=board.MOSI, MISO=board.MISO)
rfm9x = adafruit_rfm9x.RFM9x(spi, CS, RESET, 433.0)
rfm9x.tx_power = 23

index = 1
conter = 0
while os.path.exists(f"/home/pit/2024/{index}.data.csv"):
    index += 1
new_file_name = f"/home/pit/2024/{index}.data.csv"

fieldnames = [
    'time','counter',
    'IMU_Accel_x', 'IMU_Accel_y', 'IMU_Accel_z',
    'IMU_Gyro_x', 'IMU_Gyro_y', 'IMU_Gyro_z',
    'Battery_1','Battery_2','Brake_Pedal',
    'ca_AmpHrs','ca_Voltage','ca_Current','ca_Speed','ca_Miles',
    'motor_temp','throttle'
    ]

ax = None
ay = None
az = None
gx = None
gy = None
gz = None
batt1 = None
batt2 = None
bp = None
AH = None
V = None
C = None
S = None
M = None
MT = None
th = None

def printError(erorr):
    print("_"*20)
    print(" "*7,"ERORR!"," "*7)
    print("\/"*10)
    print(" ")
    print(erorr)
    print(" ")
    print("_"*20)
    
while True:
    with open(new_file_name, 'a', newline='') as csv_file: 
        
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        if conter == 0:
            writer.writeheader()
    
        conter += 1
        packet = None

        # check for packet rx
        packet = rfm9x.receive()
        
        if packet is None:
            print('- Waiting for PKT -')
            writer.writerow({'time':datetime.now(),'counter':conter})
        else:
            
            try:
                current_packet = str(packet, "utf-8")
                print(current_packet)

                try:
                    all_data = current_packet.split('|')
                    # print(all_data)
                    print(conter)
                    CA, BP, temps, motor, throttle, IMU = map(str, all_data)
                    
                    if IMU.startswith("imu,"):
                        values = IMU.split(',')
                        ax, ay, az, gx, gy, gz = map(float, values[1:])
                        if ay == "None":
                            ax = ""
                            ay = ""
                            az = ""
                            gx = ""
                            gy = ""
                            gz = ""

                    if temps.startswith("temps,"):
                        values = temps.split(',')
                        batt1, batt2 = map(float, values[1:])
                        if batt1 == "None":
                            batt1 = ""
                        if batt2 == "None":
                            batt2 = ""

                    if BP.startswith("BP,"):
                        values = BP.split(',')
                        bp = values[1:][0]
                        if bp == "None":
                            bp = ""

                    if CA.startswith("CA,"):
                        values = CA.split(',')
                        try:
                            AH, V, C, S, M, Other, Other = values[1:]
                            if AH == "None":
                                AH = ""
                            if V == "None":
                                V = ""
                            if C == "None":
                                C = ""
                            if S == "None":
                                S = ""
                            if M == "None":
                                M = ""
                        except:
                            pass

                    if motor.startswith("motor,"):
                        values = motor.split(',')
                        MT = values[1:][0]
                        if MT == "None":
                            MT = ""

                    if throttle.startswith("throttle,"):
                        values = throttle.split(',')
                        th = values[1:][0]
                        if th == "None":
                            th = ""

                except Exception as err:
                    printError(err)
                
                try:
                    writer.writerow({
                        'time':datetime.now(),'counter':conter,
                        'IMU_Accel_x':ax, 'IMU_Accel_y':ay, 'IMU_Accel_z':az,
                        'IMU_Gyro_x':gx, 'IMU_Gyro_y':gy, 'IMU_Gyro_z':gz,
                        'Battery_1':batt1,'Battery_2':batt2,'Brake_Pedal':bp,
                        'ca_AmpHrs':AH,'ca_Voltage':V,'ca_Current':C,'ca_Speed':S,'ca_Miles':M,
                        'motor_temp':MT,'throttle':th
                        })
                except Exception as err:
                    printError(err)
            except Exception as err:
                printError(err)
        csv_file.close()    
    
