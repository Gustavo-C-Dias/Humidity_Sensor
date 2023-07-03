# Projeto Humidity Sensor
Este é o repositório da implementação final do meu projeto integrador, feito para o curso em informática do IFC - Campus Camboriú

### Projeto
A ideia desse projeto foi construir um sistema de monitoramento para lavouras com foco em umidade, tanto da terra quanto do ar, onde depois o usuário conseguisse observar os dados por meio de um dashboard exclusivo. Desta forma divemos diversas tecnologias envolvidas para trabalhar com os sensores, pegar essas informações para colocar no banco de dados, consulta das informações ao ponto e apresentação do usuário. 

Dentro da pasta de banco de dados temos nosso script de criação de database que rodava localmente dentro do MysqlServer e as aplicações que realizavam a inserção ou a consulta das informações que rodava o script SQL correspondente.
Na parte de sensores era dividido em dois módulos, um que ficava no campo e outro que recebia essas informações por meio de rádio frequência, ambos tinha a sua programação no arduino e estão separados em cada pasta. A leitura de dados era feita por meio da leitura da porta USB e quando tínhamos todas as informações realizava o insert no banco de dados. 
Na parte do servidor, onde rodava toda a minha aplicaçao front-end e back-end, temos o arquivo de rota que fazia os direcionamento e funções que precisavam ser feitas, as consultas que precisavam ser feitas ao banco, entre outros item importante totalmente em JS.

### Rodando o projeto
Para rodar o projeto, que hoje infelizmente não é possível por conta da falta das telas dentro desse repositório, precisava rodar:
npm install para instalar todos os pacotes da biblioteca
nom run dev para 
