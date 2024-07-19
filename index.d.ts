declare module 'geo-coord-utils' {
    interface UTMCoords {
        easting: number;
        northing: number;
        zoneNum: number;
        zoneLetter: string;
    }
    interface DMSCoords {
        latD: number,
        latM: number,
        latS: number,
        latDir: string,
        lonD: number,
        lonM: number,
        lonS: number,
        lonDir: string
    }

    interface LatLonCoords {
        latitude: number;
        longitude: number;
    }

    export function UTMToDMS(params:UTMCoords): DMSCoords;
    export function UTMToLatLon(params:UTMCoords): LatLonCoords;
    export function LatLonToUTM(lat: number, lon: number): UTMCoords;
    export function LatLonToDMS(lat: number, lon: number): DMSCoords;
    export function DMSToLatLon(params:DMSCoords): LatLonCoords;
    export function DMSToUTM(params:DMSCoords): UTMCoords;
}
