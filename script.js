let city = document.querySelector('.city');

let graphValues = async (data) => {
    let xvalues = [], yvalues = [];
    for (let i = 0; i < data.length; i += 8) {
        xvalues.push(data[i].dt_txt.substring(0, 10));
        yvalues.push(data[i].main.temp);
    }
    return { xvalues, yvalues }
}

let getWeather = async () => {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=41202df047fd63403bdfb9681c6c9bdb&units=metric`);
    let resdata = await res.json();
    let list = resdata.list;
    let graphData = await graphValues(list);
    console.log(graphData)
    const graph = {
        labels: graphData.xvalues,
        dataSets: [{
            label: 'Temp',
            data: graphData.yvalues,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(201, 203, 207, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 95, 132, 0.2)'
            ],
            borderColor: [
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(201, 203, 207)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(255, 95, 132)'
            ],
            borderWidth: 1
        }]
    }
    const config = {
        type: 'bar',
        data: graph,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };
    const myChart = new Chart(document.getElementById('barGraph').getContext('2d'), config);
}