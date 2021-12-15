const mostrarsenha = document.getElementById("check");

//Botão de trocar senha
mostrarsenha.onclick = function () {
    var tipo = document.getElementById("senha");
    if (tipo.type == "password") {
        tipo.type = "text";
        mostrarsenha.classList.add("ativo");
        mostrarsenha.style.backgroundColor = "orangered";
        mostrarsenha.style.color = "white"
    } else {
        tipo.type = "password";
        mostrarsenha.classList.toggle("ativo");
        mostrarsenha.style.backgroundColor = "transparent";
        mostrarsenha.style.color = "rgb(48, 48, 48)"
    }
}


const span = document.getElementById("erro")
const form = document.querySelector("form")

form.addEventListener("submit", async ev => {
    ev.preventDefault()
    var request = await fetch("/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: form.usuario.value, 
                               senha: form.senha.value 
        })
    })

    var dados = await request.json()
    console.log(dados)
    if (dados === "Nulo"){
        span.innerHTML = "Login Inválido";
    } else {
        window.location = "/Principal";
    }
})

