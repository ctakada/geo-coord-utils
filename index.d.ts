declare module 'geo-coord-utils' {
    interface UTMCoords {
        easting: number;
        northing: number;
        zoneNum: number;
        zoneLetter: string;
    }
    interface DMSParamsCoords {
        latD: number,
        latM: number,
        latS: number,
        latDir: string,
        lonD: number,
        lonM: number,
        lonS: number,
        lonDir: string
    }

    interface DMSResponseCoords {
        lat: string;
        lon: string;
    }

    interface LatLonCoords {
        latitude: number;
        longitude: number;
    }

    export function UTMToDMS(params:UTMCoords): DMSResponseCoords;
    export function UTMToLatLon(params:UTMCoords): LatLonCoords;
    export function LatLonToUTM(lat: number, lon: number): UTMCoords;
    export function LatLonToDMS(lat: number, lon: number): DMSResponseCoords;
    export function DMSToLatLon(params:DMSParamsCoords): LatLonCoords;
    export function DMSToUTM(params:DMSParamsCoords): UTMCoords;
}
