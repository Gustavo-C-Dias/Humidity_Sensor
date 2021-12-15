const mysql = require("mysql2/promise");

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection
    } else {
        const connection = await mysql.createConnection("mysql://root:sempreeu0711@localhost:3306/pi_humidity")
        global.connection = connection;
        return connection;
    }
}

async function consulta_Usuario(username, password) {
    const conexao = await connect();
    const sql = 'Select * from Cliente where nome = ? and senha= ?';
    const values = [username, password];
    var [rows] = await conexao.query(sql, values)
    if (rows.length > 0) {
        return rows
    } else {
        return "Nulo"
    }
}

async function cadastro_Usuario(name, email, senha, dt_nasc) {
    const conexao = await connect();
    const sql = 'Select * from Cliente where email = ?';
    const values = [email];
    var [rows] = await conexao.query(sql, values);
    if (rows.length == 0) {
        const sql = 'Insert into Cliente(nome,email,senha,dt_nasc) values (?,?,?,?)';
        const values = [name, email, senha, dt_nasc];
        var [rows] = await conexao.query(sql, values);
        if ([rows].length > 0) {
            return [rows]
        } else {
            return "Error"
        }
    } else {
        return "Conflict"
    }
}


//Andamento troca de senha

async function esqueci_Senha(email){
    var id_cliente = 0;
    const conexao = await connect();
    const sql = 'Select * from Cliente where email = ?';
    const values = [email];
    var [rows] = await conexao.query(sql, values);
    if([rows].length > 0){
        rows.forEach(element => {
            id_cliente = element.id_cliente
        });
        const sql = "Insert into pi_humidity.Recuperar_Senha (id_cliente, data) values (?,now())";
        const values = [id_cliente]
        const [rows] = await conexao.query(sql,values);
    } else {
        return "s/registro"
    }
}

async function trocar_Senha(password, email){
    const conexao = await connect()
    const sql = 'update Cliente set senha= ? where email = ?';
    const values = [password, email];
    var [rows] = await conexao.query(sql,values);
}

async function lavoura_Principal (id_cliente){
    const conexao = await connect();
    const sql = "Select * from Lavoura where id_cliente = ?";
    const values = [id_cliente];
    var[rows] = await conexao.query(sql,values);
    return rows;
}

async function Sensor_Principal (id_cliente){
    const conexao = await connect();
    const sql = "Select S.*, L.nome from Sensor S join Lavoura L on S.id_lavoura = L.id_lavoura where S.id_cliente = ? order by L.nome";
    const values = [id_cliente];
    var [rows] = await conexao.query(sql,values);
    console.log(rows)
    return rows;
}

async function TDados_Principal (id_sensor){
    const conexao = await connect();
    const sql = "Select * from Sensor where id_sensor = ?";
    const values = [id_sensor];
    const [rows] = await conexao.query(sql,values);
    return [rows]
}

async function CadastrarPlantacao(nome, observacao, id_umidade, id_cliente){
    const conexao = await connect();
    const sql = "Insert into Lavoura (nome, dt_criacao, observacao, id_umidade, id_cliente) values (?,now(),?,?,?";
    const values = [nome, observacao, id_umidade, id_cliente];
    const [rows] = await conexao.query(sql,values);
    console.log ([rows]);
}

async function Dados_Grafico (id_cliente){
    const conexao = await connect();
    const sql = `Select D.umidade_solo, D.temperatura_ar, D.umidade_ar, time_format(D.tempo, '%H:%i') as tempo
                 from Dado D join Sensor S join Lavoura L join Cliente C
                 on D.id_sensor = S.id_sensor and S.id_lavoura = L.id_lavoura and L.id_cliente = C.id_cliente
                 where  C.id_cliente = ? and D.data > time(now()-interval 4 hour);`
    const values = [id_cliente];
    const [rows] = await conexao.query(sql,values);
    return rows
}

async function Media_Dados (id_cliente){
    const conexao = await connect();
    const sql = `Select avg(D.umidade_solo) as umidade_solo, avg(D.temperatura_ar) as temperatura_ar, avg(D.umidade_ar) as umidade_ar
                 from Dado D join Sensor S join Lavoura L join Cliente C
                 on D.id_sensor = S.id_sensor and S.id_lavoura = L.id_lavoura and L.id_cliente = C.id_cliente
                 where  C.id_cliente = ? and D.data > time(now()-interval 4 hour);`
    const values = [id_cliente]
    const [rows] = await conexao.query(sql,values);
    return rows
}

module.exports = { consulta_Usuario, 
                   cadastro_Usuario, 
                   Sensor_Principal,
                   lavoura_Principal,
                   TDados_Principal, 
                   CadastrarPlantacao,
                   esqueci_Senha,
                   trocar_Senha,
                   Dados_Grafico,
                   Media_Dados
                 }