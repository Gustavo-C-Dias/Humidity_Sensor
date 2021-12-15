#include "dht.h"
#include <VirtualWire.h>

#define pin_dht11 A1
#define pin_yl69 A2
#define pin_trans 8
#define id 02

dht DHT;

struct tipoPacote{
  int id_placa;
  double umid_yl;
  double umid_dht;
  double temp_dht;
};

tipoPacote Dados;

void setup() {
  pinMode(pin_yl69,INPUT);
  vw_set_tx_pin(pin_trans);
  vw_set_ptt_inverted(true);
  vw_setup(2000);
  Serial.begin(9600);
}

void loop() {
  //YL-69
  double valor_yl = analogRead(pin_yl69);
  valor_yl = map(valor_yl, 0, 1023, 100, 0);
  
  //DHT-11
  DHT.read11(pin_dht11);
  double umidade = DHT.humidity;
  double temperatura = DHT.temperature;

  //Pacote
  Dados.id_placa = id;
  Dados.umid_yl = valor_yl;
  Dados.umid_dht = umidade;
  Dados.temp_dht = temperatura;

  //Enviar
  vw_send((uint8_t *)&Dados, sizeof(Dados));
  vw_wait_tx(); 
  
  delay(2000);
}
