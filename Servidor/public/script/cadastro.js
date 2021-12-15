const span = document.getElementById("erro")
const form = document.getElementById("formcadastro")

form.addEventListener("submit", async ev => {
    ev.preventDefault()
    if (form.senha.value == form.senhaconf.value) {
        var request = await fetch("/cadastro", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: form.name.value, 
                email: form.email.value, 
                senha: form.senha.value, 
                datanasc: form.datanasc.value
            })
        })

        var dados = await request.json()
        if (dados === "Error") {
            span.innerHTML = "Erro durante o cadastro";
        } else {
            if (dados === "Conflict") {
                span.innerHTML = "Usuario já cadastrado";
            } else {
                alert("Usuario Cadastrado")
                window.location = "/Login";
            }}
    } else {
        span.innerHTML = "Senhas não Conferem";
    }
});