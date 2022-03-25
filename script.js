let city = document.querySelector('.city');
let date = document.querySelector('.date');
let div = document.querySelector('.result');
let divHead = document.querySelector('.resHead');

let getWeather = () => {
    divHead.innerHTML = '';
    div.innerHTML = '';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=41202df047fd63403bdfb9681c6c9bdb&units=metric`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let list = data.list;
            let count = 0;
            divHead.innerHTML = `${data.city.name.toUpperCase()}`;
            divHead.innerHTML += `<p>Date : ${rev(date.value)[0]}</p>`
            for (let i = 0; i < data.list.length; i++) {
                if (list[i].dt_txt.includes(date.value)) {
                    let dt = rev(list[i].dt_txt);
                    let image = document.createElement('img');
                    let sect = document.createElement('div');
                    image.setAttribute('src', `https://openweathermap.org/img/wn/${list[i].weather[0].icon}@2x.png`);
                    sect.setAttribute('class', 'details');
                    sect.innerHTML = `${dt[1]}<br>
                    TEMP : ${list[i].main.temp} ˚ C<br>`;
                    sect.append(image);
                    sect.innerHTML += `<br>${list[i].weather[0].description}`;
                    count++;
                    div.append(sect);
                }
            }
            if (count === 0) {
                div.innerHTML = 'Data available only for 5 days from today';
            }
        })
}

let rev = (str) => {
    let dt = str.substring(0, 10);
    let time = str.substring(11);
    let dtarr = [dt.substring(0, 4), '/', dt.substring(5, 7), '/', dt.substring(8)]
    dtarr = dtarr.reverse();
    dt = dtarr.join('');
    return [dt, time];
}