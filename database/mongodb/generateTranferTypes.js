const {TransferTypeRepo} = require("../repository");

const GenTransferTypes = async () => {

    let transferTypes = [];

    transferTypes = [
       {tt_code: "FEES", tt_desi: "paiement des frais de transport"},
       {tt_code: "SUBS", tt_desi: "Transfer de souscription"},
       {tt_code: "MBACK", tt_desi: "Money back - retour monnaie électronique au client"}
    ]

    transferTypes.forEach(async (tt) => {
        const existData = await TransferTypeRepo.findOne({tt_code: tt.tt_code})
        if (!existData) {
            try {
                const created = await TransferTypeRepo.create(tt)
                console.log(`transfer Type ${created.tt_code} successfully created!`)
            } catch (error) {
                console.log(`Erreur génération ${tt.tt_code}`)
            }
        } 
    })
    
}

module.exports = GenTransferTypes


