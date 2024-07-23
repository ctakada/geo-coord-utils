const utm = require('utm');

// Función para convertir grados decimales a DMS
function toDMS(deg, direction) {
    const degrees = Math.floor(Math.abs(deg));
    const minFloat = (Math.abs(deg) - degrees) * 60;
    const minutes = Math.floor(minFloat);
    const secFloat = (minFloat - minutes) * 60;
    const seconds = Number(secFloat.toFixed(1));

    return {
        degrees: (degrees < 0) ? 0 : degrees,
        minutes: ( minutes > 59 ? 59: minutes),
        seconds: ( seconds > 59 ? 59: seconds),
        direction
    };
}

// Función para convertir DMS a grados decimales
function DMSToDeg(d, m, s, direction) {
    if (m < 0 || m >= 60 || s < 0 || s >= 60) {
        throw new RangeError("Minutes and seconds must be between 0 and 59.999...");
    }

    let deg = d + m / 60 + s / 3600;
    if (direction === 'S' || direction === 'W') {
        deg = -deg;
    }
    return deg;
}

function getValidLatD(latD){
    if(latD > 90){
        return 90
    }
    return latD
}

function getValidLonD(lonD){
    if(lonD > 180){
        return 180
    }
    return lonD
}

// Función para convertir lat/lon a DMS
function LatLonToDMS(lat, lon) {
    if (lat < -90 || lat > 90) {
        throw new RangeError('Latitude must be between -90 and 90 degrees.');
    }
    if (lon < -180 || lon > 180) {
        throw new RangeError('Longitude must be between -180 and 180 degrees.');
    }
    const latDirection = lat >= 0 ? 'N' : 'S';
    const lonDirection = lon >= 0 ? 'E' : 'W';
    const latitude = toDMS(lat, latDirection);
    const longitude = toDMS(lon, lonDirection);
    return {
      latD: getValidLatD(latitude.degrees),
      latM: latitude.minutes,
      latS: latitude.seconds,
      latDir: latitude.direction,
      lonD: getValidLonD(longitude.degrees),
      lonM: longitude.minutes,
      lonS: longitude.seconds,
      lonDir: longitude.direction
    }
}

function getValidLatitude(latitude){
    if (latitude < -90){
        return -90
    }
    if(latitude > 90){
        return 90
    }
    return latitude
}

function getValidLongitude(longitude){
    if (longitude < -180){
        return -180
    }
    if(longitude > 180){
        return 180
    }
    return longitude
}

// Función para convertir DMS a lat/lon
function DMSToLatLon({latD, latM, latS, latDir, lonD, lonM, lonS, lonDir}) {
    const latitude = DMSToDeg(latD, latM, latS, latDir);
    const longitude = DMSToDeg(lonD, lonM, lonS, lonDir);
    return {
        latitude: getValidLatitude(latitude),
        longitude: getValidLongitude(longitude)
    };
}

// Función para convertir lat/lon a UTM
function LatLonToUTM(lat, lon) {
    return utm.fromLatLon(lat, lon);
}

// Función para convertir UTM a lat/lon
function UTMToLatLon({easting, northing, zoneNum, zoneLetter}) {
    const {latitude,longitude} = utm.toLatLon(easting, northing, zoneNum, zoneLetter);
    return {
        latitude: getValidLatitude(latitude),
        longitude: getValidLongitude(longitude)
    }
}

// Función para convertir DMS a UTM
function DMSToUTM({latD, latM, latS, latDir, lonD, lonM, lonS, lonDir}) {
    const { latitude, longitude } = DMSToLatLon({latD, latM, latS, latDir, lonD, lonM, lonS, lonDir});
    return LatLonToUTM(latitude, longitude);
}

// Función para convertir UTM a DMS
function UTMToDMS({easting, northing, zoneNum, zoneLetter}) {
    const { latitude, longitude } = UTMToLatLon({easting, northing, zoneNum, zoneLetter});
    console.log(latitude,longitude)
    return LatLonToDMS(latitude, longitude);
}


module.exports = { UTMToDMS, UTMToLatLon, LatLonToUTM: LatLonToUTM, LatLonToDMS: LatLonToDMS, DMSToLatLon, DMSToUTM };