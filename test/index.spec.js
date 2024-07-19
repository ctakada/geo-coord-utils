const  {DMSToUTM, UTMToDMS} = require('../src/index')


describe('test library',()=>{

    const dmsToUtmExample = {
        latD: 33,
        latM: 27,
        latS: 25,
        latDir: 'S',
        lonD: 70,
        lonM: 38,
        lonS: 53.8,
        lonDir: 'W'
    };

    it('should be equal in two bands', ()=>{

        const utm = DMSToUTM(dmsToUtmExample)
        const dms =UTMToDMS(utm)
        console.log(dms, utm)
        expect(dmsToUtmExample).toEqual(dms)
    })
})