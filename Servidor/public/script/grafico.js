let temperatura = []
let umidade_ar = []
let umidade_solo = []
let tempo = []

async function Dados(){ 
    var request = await fetch("/Principal/Grafico",{
     method:"POST",
     headers: { 'Content-Type': 'application/json' },
    }) 
    
const dados = await request.json()

if (dados.length > 0){
    console.log(dados)
    dados.forEach(element => {
        temperatura.push(element.temperatura_ar)
        umidade_solo.push(element.umidade_solo)
        umidade_ar.push(element.umidade_ar)
        tempo.push(element.tempo)
    })
}} Dados();

var ctx = document.getElementById('myChart').getContext('2d');
var mixedChart = new Chart(ctx, {
    data: {
        fill: true,
        labels: tempo,
        datasets: [{
            type: 'line',
            label: 'Umidade solo',
            data: umidade_solo,
            tension: 0.2,
            backgroundColor: 'rgba(14, 91, 48)',
            borderColor:'rgba(12, 107, 55, 0.8)'
        }, {
            type: 'line',
            label: 'Umidade Atmosférica',
            data: umidade_ar,
            backgroundColor: 'rgba(30,144,255)', 
            borderColor:'rgba(10, 111, 208, 0.8)',
            tension: 0.2
        }, {
            type: 'bar',
            label: 'Temperatura',
            data: temperatura,
            backgroundColor: 'rgba(248,	179, 36, 0.9)', 
        }],
    },
    options: {
        elements: {
            line: {
                borderWidth: 5,
            }
        }
    },
});