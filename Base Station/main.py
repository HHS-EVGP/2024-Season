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
while os.path.exists(f"/home/pit/{index}.data.csv"):
    index += 1
new_file_name = f"/home/pit/{index}.data.csv"

fieldnames = [
    'time','counter',
    'motor_temp','throttle',
    'Brake_Pedal','Battery_1','Battery_2',
    'IMU_Accel_x', 'IMU_Accel_y', 'IMU_Accel_z',
    'IMU_Gyro_x', 'IMU_Gyro_y', 'IMU_Gyro_z',
    'ca_AmpHrs','ca_Voltage','ca_Current','ca_Speed','ca_Miles'
    ]

accelerometer_x = None
accelerometer_y = None
accelerometer_z = None
gyroscope_x = None
gyroscope_y = None
gyroscope_z = None

th = None

motor_temp = None
Battery_temp_1 = None
Battery_temp_2 = None

brake_pedal = None

amp_hours = None
voltage = None
current = None
speed = None
miles = None

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
                    
                    # TODO FIX NO-VALUE
                    if IMU.startswith("imu,"):
                        values = IMU.split(',')
                        accelerometer_x, accelerometer_y, accelerometer_z, gyroscope_x, gyroscope_y, gyroscope_z = map(float, values[1:])
                        if accelerometer_y == "None":
                            accelerometer_x = ""
                            accelerometer_y = ""
                            accelerometer_z = ""
                            gyroscope_x = ""
                            gyroscope_y = ""
                            gyroscope_z = ""

                    if temps.startswith("temps,"):
                        values = temps.split(',')
                        Battery_temp_1, Battery_temp_2 = map(float, values[1:])

                        # TODO FIX NO-VALUE
                        if Battery_temp_1 == "None":
                            Battery_temp_1 = ""
                        if Battery_temp_2 == "None":
                            Battery_temp_2 = ""

                    # TODO FIX NO-VALUE
                    if BP.startswith("BP,"):
                        values = BP.split(',')
                        brake_pedal = values[1:][0]
                        if brake_pedal == "None":
                            brake_pedal = ""

                    # TODO FIX NO-VALUE
                    if CA.startswith("CA,"):
                        values = CA.split(',')
                        try:
                            amp_hours, voltage, current, speed, miles, Other, Other = values[1:]
                            if amp_hours == "None":
                                amp_hours = ""
                            if voltage == "None":
                                voltage = ""
                            if current == "None":
                                current = ""
                            if speed == "None":
                                speed = ""
                            if miles == "None":
                                miles = ""
                        except:
                            pass

                    if motor.startswith("motor,"):
                        values = motor.split(',')
                        motor_temp = values[1:][0]
                        if motor_temp == "None":
                            motor_temp = ""

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
                        'IMU_Accel_x':accelerometer_x, 'IMU_Accel_y':accelerometer_y, 'IMU_Accel_z':accelerometer_z,
                        'IMU_Gyro_x':gyroscope_x, 'IMU_Gyro_y':gyroscope_y, 'IMU_Gyro_z':gyroscope_z,
                        'Battery_1':Battery_temp_1,'Battery_2':Battery_temp_2,'Brake_Pedal':brake_pedal,
                        'ca_AmpHrs':amp_hours,'ca_Voltage':voltage,'ca_Current':current,'ca_Speed':speed,'ca_Miles':miles,
                        'motor_temp':motor_temp,'throttle':th
                        })
                except Exception as err:
                    printError(err)
            except Exception as err:
                printError(err)
        csv_file.close()    
    
