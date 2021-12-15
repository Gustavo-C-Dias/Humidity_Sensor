create database pi_humidity;
use pi_humidity;

create table Cliente
( id_cliente integer auto_increment not null,
  nome varchar(255) not null,
  email varchar(255) not null,
  senha varchar(36) not null,
  dt_nasc date not null,
  confirmado binary default 0,
  primary key(id_cliente)
);

create table Recuperar_Senha 
( id_recuperar integer auto_increment not null,
  id_cliente integer not null,
  data date not null,
  primary key (id_recuperar),
  foreign key (id_cliente) references Cliente(id_cliente)
);

create table Umidade
( id_umidade integer auto_increment not null,
  plantacao varchar(255) not null,
  umidade double not null,
  primary key(id_umidade)
);

create table Lavoura
( id_lavoura integer auto_increment not null,
  nome varchar(255) not null,
  umidade_media double,
  dt_criacao datetime not null,
  observacao longtext,
  id_umidade integer not null,
  id_cliente integer not null,
  primary key(id_lavoura),
  foreign key (id_umidade) references Umidade(id_umidade),
  foreign key (id_cliente) references Cliente(id_cliente)
);

create table Sensor 
( id_sensor integer auto_increment not null,
  localizacao varchar(255),
  id_lavoura integer,
  id_cliente integer,
  primary key(id_sensor),
  foreign key (id_lavoura) references Lavoura(id_lavoura) on delete set null,
  foreign key (id_cliente) references Cliente(id_cliente)
);

create table Dado
( id_dado integer auto_increment not null,
  umidade_solo double,
  temperatura_ar double,
  umidade_ar double,
  data datetime,
  tempo time, 
  id_sensor integer not null,
  primary key(id_dado),
  foreign key (id_sensor) references Sensor(id_sensor)
);
