let data;

async function obtenerDatos() {
    try {
        const res = await fetch('https://mindicador.cl/api/');
        data = await res.json();  
    } catch (e) {
        const errorMsj = document.querySelector('#errorMensaje');
        errorMsj.innerHTML = `Algo salió mal! Error: ${e.message}`;
    }
    
}

obtenerDatos();

const convertirValor = function() {
    const valor = document.querySelector('#valor').value;
    const moneda = document.querySelector('#moneda').value;

    const valorConvertido = valor / data[moneda].valor;

    document.querySelector('#resultado').textContent = `El valor convertido es: ${valorConvertido.toFixed(2)}`;
}


//Gráfico

async function grafico() {
    const res = await fetch('https://mindicador.cl/api/dolar/2024');
    const gDolar = await res.json();

    let info = [];
    for(let i = 0; i < 10; i++) {
        info.unshift(gDolar.serie[i])
    }

    const labels = info.map((cambio) => {
        return cambio.fecha.split('T')[0];
    });

    const gData = info.map((cambio) => {
        return cambio.valor;
    });

    const datasets = [
        {
            label: 'Últimos 10 días',
            borderColor: '#9961e1',
            gData,
        },
    ];
    return {labels, datasets};
}

async function renderGrafica() {
    const data = await grafico();
    const config = {
        type: "line",
        data,
    };
    const myChart = document.querySelector("#myChart");
    myChart.style.backgroundColor = "white";
    new Chart(myChart, config);
}

renderGrafica();

