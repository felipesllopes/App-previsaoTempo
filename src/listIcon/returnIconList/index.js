export default function returnIconList(data) {

    let hora = data.dt_txt.substring(11, 13);
    let tempo = data.weather[0].description;

    if (hora >= 6 && hora <= 19) {
        if (tempo == "clear sky") { // tempo limpo
            return "sunny";
        }
        if (tempo == "broken clouds" || tempo == "few clouds" || tempo == "scattered clouds") { // nuvens quebradas/ poucas nuvens/ nuvens dispersas
            return "partly-sunny";
        }
    } else {
        if (tempo == "clear sky") { // tempo limpo
            return "moon";
        }
        if (tempo == "broken clouds" || tempo == "few clouds" || tempo == "scattered clouds") { // nuvens quebradas/ poucas nuvens/ nuvens dispersas
            return "cloudy-night";
        }
    }
    // esses icons são independentes de sol e lua, então ficam fora da condição de hora
    if (tempo == "overcast clouds") { // nublado
        return "cloud";
    }
    if (tempo == "light rain" || tempo == "moderate rain") { // chuva leve/ chuva moderada
        return "rainy";
    }
    if (tempo == "light snow" || tempo == "snow") { // pouca neve, neve
        return "snow";
    }
}