const {ProfilRepo} = require("../repository");



const GenProfils = async () => {

    let codeProfilCreated = []

    let ProfilList = [];

    const appliProfils = [
        {profil_code: "GERANT", profil_desi: "Gestion du Vehicule", profil_desc: "individu ayant la responsabilité du vehicule"},
        {profil_code: "CHAUFFEUR", profil_desi: "Chauffeur associé au système (SPM)", profil_desc: "Chauffeur principal ou secondaire associé au SPM"},
        {profil_code: "CLIENT", profil_desi: "Client", profil_desc: "Usager de l'appli en vu de paiement des frais de transport"},
        {profil_code: "BO-ADMIN", profil_desi: "Adminstrateur", profil_desc: "Adminstrateur Backoffice"},
        {profil_code: "BO", profil_desi: "Utilisateur backoffice", profil_desc: "Utilisateur Backoffice"},
        {profil_code: "SPM", profil_desi: "Utilisateur génération et gestion de SPM", profil_desc: "Utilisateur traitant des SPM"},
    ]

    const CodeProfilsToCreate = appliProfils.map(item => item.profil_code);
    
    try { 
        ProfilList = await ProfilRepo.getAll();
        codeProfilCreated = ProfilList.map(elmt => elmt.profil_code);
    } catch (error) {}

    CodeProfilsToCreate.forEach(async (code) => {
            if (codeProfilCreated.indexOf(code) == -1) {
                try {
                    const data = appliProfils.find(el => el.profil_code == code )
                    await ProfilRepo.create(data)
                    console.log(`Profil ${data.profil_code} successfully created!`)
            } catch (error) {
                console.log(`Could not create profil ${code}`)
            }
        }
    })


}

module.exports = GenProfils


