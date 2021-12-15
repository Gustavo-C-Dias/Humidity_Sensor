var mostrarmenu = document.getElementById("menubutton");
var fundomenu = document.getElementById("fundo");

//subir e descer do menu - BOTÃO
mostrarmenu.onclick = function(){
    if(mostrarmenu.value == "Menu ▼"){
        fundomenu.style.marginTop = "5.65%";
        mostrarmenu.value = "Menu ▲";
        mostrarmenu.classList.add("acionado");
    }else{
        fundomenu.style.marginTop = "-110%";
        mostrarmenu.value = "Menu ▼";
        mostrarmenu.classList.toggle("acionado");
    }
}

//subir e descer do menu - FUNDO
fundomenu.onclick = function () {
    if(mostrarmenu.value == "Menu ▼"){
        fundomenu.style.marginTop = "5.65%";
        mostrarmenu.value = "Menu ▲";
        mostrarmenu.classList.add("acionado");
    }else{
        fundomenu.style.marginTop = "-110%";
        mostrarmenu.value = "Menu ▼";
        mostrarmenu.classList.toggle("acionado");
    }
}