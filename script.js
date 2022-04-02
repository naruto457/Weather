let city = document.querySelector('.city');
let graphType = document.querySelector('#graphType');

document.querySelector('form').addEventListener('click', (e) => {
    e.preventDefault();
})

let getWeather = async () => {
    let weatherapi = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=25e727a45d41d95cba31ac89a02af7f3&units=metric`);
    let weatherData = await weatherapi.json();
    let weatherList = weatherData.list;
    const xlabels = [];
    const temp = [];
    for (let i = 0; i < weatherList.length; i += 8) {
        xlabels.push(`${weatherList[i].dt_txt.substring(8, 10)}/${weatherList[i].dt_txt.substring(5, 7)}/${weatherList[i].dt_txt.substring(0, 4)}`);
        temp.push(weatherList[i].main.temp);
    }
    const data = {
        labels: xlabels,
        datasets: [{
            label: 'Temperature',
            data: temp,
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
        }]
    }
    let type = graphType.value;
    const config = {
        type: type,
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    }
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'chart');
    document.querySelector('.res').innerHTML = '';
    document.querySelector('.res').append(canvas);
    const mychart = new Chart(document.getElementById('chart'), config);
}