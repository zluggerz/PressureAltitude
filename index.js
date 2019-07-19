const rp = require('request-promise');

function getPressure() {    
    return rp({
        uri: 'http://api.openweathermap.org/data/2.5/weather?lat=40.8675&lon=-96.11&id=524901&APPID=43575b8a095ed1f890651c981101acd5',
        json: true
    })
        .then(function(data) {
            let info = [
                data.main.pressure,
                data.main.temp
            ];
            console.log('Pressure and Temp(K): ' + info);
            return info;
        })
        .catch(function (err) {
            console.log(err);
        });
}

var pressureAlt = getPressure();
pressureAlt.then((result) => {
    const inHG = result[0] * .029530;
    const C = result[1] - 273.15;
    console.log('Temp(K): ' + result[1]);
    console.log('Temp(C):' + C);
    let PresAltitude = (29.92 - inHG) * 1000 + 1183;
    console.log('Pressure Altitude is ' + PresAltitude.toFixed(2));
    let DensAltitude = ((C.toFixed(2) - 17) * 120) + PresAltitude;
    console.log('Density Altitude is ' + DensAltitude.toFixed(2));
});