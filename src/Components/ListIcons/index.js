export function ListIcons(service) {

    let icon = service.weather[0].icon;

    if (icon == '01d') {
        return require('../../img/icones/01d.png')
    }
    if (icon == '01n') {
        return require('../../img/icones/01n.png')
    }
    if (icon == '02d') {
        return require('../../img/icones/02d.png')
    }
    if (icon == '02n') {
        return require('../../img/icones/02n.png')
    }
    if (icon == '03d' || icon == '03n') {
        return require('../../img/icones/03d.png')
    }
    if (icon == '04d' || icon == '04n') {
        return require('../../img/icones/04d.png')
    }
    if (icon == '09d' || icon == '09n') {
        return require('../../img/icones/09d.png')
    }
    if (icon == '10d') {
        return require('../../img/icones/10d.png')
    }
    if (icon == '10n') {
        return require('../../img/icones/10n.png')
    }
    if (icon == '11d' || icon == '11n') {
        return require('../../img/icones/11d.png')
    }
    if (icon == '13d' || icon == '13n') {
        return require('../../img/icones/13d.png')
    }
    if (icon == '50d' || icon == '50n') {
        return require('../../img/icones/50d.png')
    }
}