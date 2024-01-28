#!/usr/bin/env python

"""
Este script se encarga de recibir datos desde un dispositivo a través de un puerto serial y 
publicarlos en un servidor MQTT local. Los datos recibidos son en formato JSON y se analizan
antes de ser enviados como mensajes MQTT. El script se ejecuta en un bucle hasta que se 
presiona la tecla 'q' para salir.

Este script utiliza las siguientes bibliotecas:
- serial: Para establecer una conexión serial con un dispositivo.
- paho.mqtt.client: Para configurar un cliente MQTT y publicar datos en un servidor MQTT.
- keyboard: Para detectar si se presiona la tecla 'q' y salir del bucle.
- json: Para analizar los datos JSON recibidos desde el dispositivo.
"""

import serial
import paho.mqtt.client as mqtt
import keyboard
import json

# Configurar la conexión serie
arduino = serial.Serial('COM4', 9600)

# Configurar cliente MQTT
client = mqtt.Client()
client.connect("localhost", 1883, 10)

while True:
    if keyboard.is_pressed('q'):
        print("Se presionó 'q', saliendo...")
        break  # Romper el bucle
    
    # Leer datos del puerto serial
    serial_data = arduino.readline().decode().strip()

    # Verificar si los datos comienzan con "{" (inicio del JSON)
    if serial_data.startswith("{"):
        # Continuar leyendo hasta que se reciba un "}" (fin del JSON)
        while not serial_data.endswith("}"):
            serial_data += arduino.readline().decode().strip()
        
        # Analizar el JSON
        try:
            json_data = json.loads(serial_data)
            print("JSON recibido:", json_data)
            
            # Recorrer los elementos del JSON y publicarlos en MQTT
            for key, value in json_data.items():
                topic = key
                payload = str(value)  # Convertir el valor a cadena si es necesario
                client.publish(topic, payload)
                # print(f"Publicado en MQTT - Tema: {topic}, Valor: {payload}")
            
            # Puedes procesar el JSON aquí según tus necesidades
        except json.JSONDecodeError as e:
            print("Error al decodificar JSON:", e)
