import serial
import mysql.connector

Dados = []

connection = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "sempreeu0711",
    database = "pi_humidity",
)

Serial_Valor = serial.Serial()
Serial_Valor.port = 'COM3'
Serial_Valor.baudrate = 9600
Serial_Valor.open()

while True:
    if Serial_Valor.in_waiting :
        Valor = Serial_Valor.readline().rstrip().decode()
        Dados.append(Valor)

        if len(Dados) == 4 :
            try :
                banco = connection.cursor()
                sql = "Insert into Dado(umidade_solo, temperatura_ar, umidade_ar, data, tempo, id_sensor) values (%s,%s,%s,now(),now(),%s);"
                banco.execute(sql, Dados)
                connection.commit()
                print(banco.rowcount," linhas inseridas")
                Dados.clear()    
                banco.close()

            except mysql.connector.Error as error:
                print("Failed to insert record into MySQL table {}".format(error))




