const {ServiceRepo} = require("../repository");


const GenServices = async () => {

    let services = [];

    services = [
       {srv_name: "Equipement SPM", srv_code: "ACQUISPM", srv_desc: "service acquisition - souscription SPM", srv_trialDaysPeriod: -1, srv_pricing: []},
       {srv_name: "TFZ client", srv_code: "TFZCLIEN", srv_desc: "service TFZ client ", srv_trialDaysPeriod: 30, srv_pricing: []},
       {srv_name: "TFZ Suivi geolocalisé", srv_code: "SUIVGEOL", srv_desc: "service suivi geolocalisé", srv_trialDaysPeriod: -1, srv_pricing: []},
      
    ]

    services.forEach(async (srv) => {
        const existData = await ServiceRepo.findOne({srv_code: srv.srv_code})
        if (!existData) {
            try {
                const created = await ServiceRepo.create(srv)
                console.log(`service ${created.srv_code} successfully created!`)
            } catch (error) {
                console.log(`Erreur génération ${srv._code}`)
            }
        } 
    })
    
}

module.exports = GenServices


