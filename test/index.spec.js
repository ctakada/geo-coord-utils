const  {DMSToUTM, UTMToDMS, DMSToLatLon, LatLonToDMS, UTMToLatLon, LatLonToUTM} = require('../index')


describe('test library',()=>{

    const dmsExample = {
        latD: 33,
        latM: 27,
        latS: 25,
        latDir: 'S',
        lonD: 70,
        lonM: 38,
        lonS: 53.8,
        lonDir: 'W'
    };

    const utmExamle = {
        easting: 346814.9975815493,
        northing: 6296839.32907094,
        zoneNum: 19,
        zoneLetter: 'H'
    }

    it('should be equal between DMS and UTM', ()=>{

        const utm = DMSToUTM(dmsExample)
        const dms =UTMToDMS(utm)
        expect(dmsExample).toEqual(dms)
        console.log({utm, dms})
    })

    it('should be equal between DMS and LatLong', ()=>{

        const latLon = DMSToLatLon(dmsExample)
        const dms = LatLonToDMS(latLon.latitude, latLon.longitude)
        expect(dmsExample).toEqual(dms)
        console.log({latLon, dms})
    })

    it('should be equal between UTM and LatLong', ()=>{

        const latLon = UTMToLatLon(utmExamle)
        const utm = LatLonToUTM(latLon.latitude, latLon.longitude)

        console.log(latLon,utm)
        expect(Math.round(utmExamle.easting)).toEqual(Math.round(utm.easting))
        expect(Math.round(utmExamle.northing)).toEqual(Math.round(utm.northing))
        expect(utm.zoneNum).toBe(utm.zoneNum)
        expect(utm.zoneLetter).toBe(utm.zoneLetter)
        console.log({latLon, utm})
    })
})