// Valores Medio 
let umidade_solo_valor = document.getElementById("umidade_solo")
let umidade_ar_valor = document.getElementById("umidade_ar")
let temperatura_valor = document.getElementById("temperatura_ar")

async function Media(){ 
    var request = await fetch("/Principal/Media", {
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
    }) 
    
    const dados = await request.json()
    console.log(dados)

    if (dados.length > 0){
        umidade_solo_valor.querySelector("span")?.remove()
        umidade_ar_valor.querySelector("span")?.remove()
        temperatura_valor.querySelector("span")?.remove()

        // const el_solo = document.createElement("span")
        // const el_ar = document.createElement("span")
        // const el_temp = document.createElement("span")

        dados.forEach(element => {
            umidade_solo_valor.innerHTML += `<span> ${element.umidade_solo} %</span>`
            umidade_ar_valor.innerHTML += `<span> ${element.umidade_ar} %</span>`
            temperatura_valor.innerHTML += `<span> ${element.temperatura_ar} C°</span>`
        });

        // umidade_solo_valor.appendChild(el_solo)
        // umidade_ar_valor.appendChild(el_ar)
        // temperatura_valor.appendChild(el_temp)
    }
} Media();

// Conteudo div aviso
var Aviso = "Nenhum Aviso";
document.getElementById("aviso").innerHTML = Aviso;

// Formulario flutuante
let registrarPlantacao = document.getElementById("BotaoRegistrar_Platação")
let divformplantacao = document.getElementById("formPlantacao")
let situacao = true;
registrarPlantacao.onclick = () => {
    if(situacao){
        divformplantacao.style.marginTop = "-47%";
        situacao = false;
    } else {
        divformplantacao.style.marginTop = "-200%";
        situacao = true;
    }
}

let cancelarplantacao = document.getElementById("cancelar")
cancelarplantacao.onclick = () => {
    if(situacao){
        divformplantacao.style.marginTop = "-47%";
        situacao = false;
    } else {
        divformplantacao.style.marginTop = "-200%";
        situacao = true;
    }
}

// Desconectar sessão
desconectar = document.getElementById("desconectar")
desconectar.onclick = (async ev => {
     ev.preventDefault()
     var request = await fetch("/Principal/Desconectar",{
         method:"POST",
         headers: { 'Content-Type': 'application/json' },
     })
     var request = await request.json()
     if (request == 0){
         window.location = "/Login";
         alert("Você foi desconectado");
     } else {
         window.location = "/Principal";
     }
})


// Menu dropdown - plantação
let dp_plant = document.getElementById("list_plantacao")
let button_plantacao = document.getElementById("plantacao_drop")
button_plantacao.onclick = (async ev => {
    ev.preventDefault()
    if (button_plantacao.innerHTML == "🌿 Plantação ▼"){
        var request = await fetch("/Principal/Plantacao",{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        })

        var lavoura = await request.json()
        dp_plant.style.display="block"
        button_plantacao.innerHTML = "🌿 Plantação ▲"
        if (lavoura.length > 0){
            dp_plant.querySelector("span")?.remove()
            const el = document.createElement("span")
            lavoura.forEach(element => {
                el.innerHTML += `
                <a class="Plant_Cadastrada" href="Principal/Plantacao="${element.id_lavoura}">${(element.nome)}</a>
                `
            });
            dp_plant.appendChild(el)
        }
    } else {
        dp_plant.style.display="none"
        button_plantacao.innerHTML = "🌿 Plantação ▼"
    }
})


// Menu dropdown - sensores
let button_sensores = document.getElementById("sensores_drop")
let dp_sensor = document.getElementById("list_sensores")
button_sensores.onclick = (async ev => {
    ev.preventDefault()
    if (button_sensores.innerHTML == "💻 Sensores ▼"){
        var request = await fetch("/Principal/Sensores",{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        })

        var lavoura = await request.json()
        dp_sensor.style.display="block"
        button_sensores.innerHTML = "💻 Sensores ▲"
        if (lavoura.length > 0){
            dp_sensor.querySelector("span")?.remove()
            const el = document.createElement("span")
            lavoura.forEach(element => {
                el.innerHTML += `
                <a class="Plant_Cadastrada" href="Principal/Plantacao="${element.id_lavoura}">${(element.id_lavoura)} - ${(element.nome)}</a>
                `
            });
            dp_sensor.appendChild(el)
        } else {

        }
    } else {
        dp_sensor.style.display="none"
        button_sensores.innerHTML = "💻 Sensores ▼"
    }
})


// Cadastrar plantação
formPlantacao = document.getElementById("form_plantacao")
formPlantacao.addEventListener("submit", async ev => {
    ev.preventDefault()
    var request = await fetch("/Principal/CadastroPlantacao", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: formPlantacao.nome.value, 
                               obervacao: formPlantacao.observacao.value,
                               tipo: formPlantacao.tipo.value 
        })
    })
})
