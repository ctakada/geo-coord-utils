const utm = require('utm');

// Función para convertir grados decimales a DMS
function toDMS(deg, direction) {
    const degrees = Math.floor(Math.abs(deg));
    const minFloat = (Math.abs(deg) - degrees) * 60;
    const minutes = Math.floor(minFloat);
    const secFloat = (minFloat - minutes) * 60;
    const seconds = Number(secFloat.toFixed(1));

    return {
        degrees: degrees,
        minutes,
        seconds,
        direction
    };
}

// Función para convertir DMS a grados decimales
function DMSToDeg(d, m, s, direction) {
    let deg = d + m / 60 + s / 3600;
    if (direction === 'S' || direction === 'W') {
        deg = -deg;
    }
    return deg;
}

// Función para convertir lat/lon a DMS
function LatLonToDMS(lat, lon) {

    const latDirection = lat >= 0 ? 'N' : 'S';
    const lonDirection = lon >= 0 ? 'E' : 'W';
      const latitude = toDMS(lat, latDirection);
      const longitude = toDMS(lon, lonDirection);
      return {
          latD: latitude.degrees,
          latM: latitude.minutes,
          latS: latitude.seconds,
          latDir: latitude.direction,
          lonD: longitude.degrees,
          lonM: longitude.minutes,
          lonS: longitude.seconds,
          lonDir: longitude.direction
      }
}

// Función para convertir DMS a lat/lon
function DMSToLatLon({latD, latM, latS, latDir, lonD, lonM, lonS, lonDir}) {
    const lat = DMSToDeg(latD, latM, latS, latDir);
    const lon = DMSToDeg(lonD, lonM, lonS, lonDir);
    return { lat, lon };
}

// Función para convertir lat/lon a UTM
function LatLonToUTM(lat, lon) {
    return utm.fromLatLon(lat, lon);
}

// Función para convertir UTM a lat/lon
function UTMToLatLon({easting, northing, zoneNum, zoneLetter}) {
    return utm.toLatLon(easting, northing, zoneNum, zoneLetter);
}

// Función para convertir DMS a UTM
function DMSToUTM({latD, latM, latS, latDir, lonD, lonM, lonS, lonDir}) {
    const { lat, lon } = DMSToLatLon({latD, latM, latS, latDir, lonD, lonM, lonS, lonDir});
    return LatLonToUTM(lat, lon);
}

// Función para convertir UTM a DMS
function UTMToDMS({easting, northing, zoneNum, zoneLetter}) {
    const { latitude, longitude } = UTMToLatLon({easting, northing, zoneNum, zoneLetter});
    return LatLonToDMS(latitude, longitude);
}


module.exports = { UTMToDMS, UTMToLatLon, LatLonToUTM: LatLonToUTM, LatLonToDMS: LatLonToDMS, DMSToLatLon, DMSToUTM };