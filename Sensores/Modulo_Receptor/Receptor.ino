#include <VirtualWire.h>

#define pinRF  8

struct tipoPacote {
  int id_placa;
  double umid_yl;
  double umid_dht;
  double temp_dht;
};

tipoPacote pacote; 

void setup() {
  vw_set_rx_pin(pinRF);
  vw_setup(2000);   
  vw_rx_start();
  Serial.begin(9600);
}

void loop() {

  uint8_t buf[sizeof(pacote)];
  uint8_t buflen = sizeof(pacote);
  
  if (vw_have_message()) {
    vw_get_message(buf, &buflen);
    memcpy(&pacote,&buf,buflen);
    
      Serial.println(pacote.umid_yl);
      Serial.println(pacote.temp_dht);
      Serial.println(pacote.umid_dht);
      Serial.println(pacote.id_placa);
  }  
}
