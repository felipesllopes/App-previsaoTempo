export default function returnIcon(weather) {

    let hora = parseInt(new Date().getHours());
    let tempo = weather.weather[0].description;

    // esses icons são independentes de sol e lua, então ficam fora da condição de hora
    if (tempo == "overcast clouds") { // nublado
        return "cloud-outline";
    }
    if (tempo == "light rain" || tempo == "moderate rain") { // chuva leve/ chuva moderada
        return "rainy-outline";
    }
    if (tempo == "light snow" || tempo == "snow") { // pouca neve, neve
        return "snow-outline";
    }

    if (hora >= 6 && hora <= 19) {
        if (tempo == "clear sky") { // tempo limpo
            return "sunny-outline";
        }
        if (tempo == "broken clouds" || tempo == "few clouds" || tempo == "scattered clouds") { // nuvens quebradas/ poucas nuvens/ nuvens dispersas
            return "partly-sunny-outline";
        }
    } else {
        if (tempo == "clear sky") { // tempo limpo
            return "moon-outline";
        }
        if (tempo == "broken clouds" || tempo == "few clouds" || tempo == "scattered clouds") { // nuvens quebradas/ poucas nuvens/ nuvens dispersas
            return "cloudy-night-outline";
        }
    }

}