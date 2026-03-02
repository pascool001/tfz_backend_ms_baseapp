const {Cache} = require('../services');


module.exports = async function() {

  const now = new Date();
  const year = now.getFullYear().toString().slice(-3);
  const month = String(now.getMonth() + 1).padStart(2, '0');
   // Charger l'état existant
  let state = await Cache.getSerialState() //store.get('serial_state');
   // Initialiser si aucune donnée
  if (!state) {
    state = { year, month, counter: 0 };
  }
    // Vérifier si on est toujours dans le même mois/année
  if (state.year === year && state.month === month) {
    state.counter += 1;
  } else {
    // Réinitialisation sur changement d'année/mois
    state = { year, month, counter: 1 };
  }
 // Sauvegarder en mémoire
  await Cache.setSerialState(state) //store.set('serial_state', state);
  // Créer le numéro d'ordre sur 5 chiffres
  const order = String(state.counter).padStart(5, '0');
  // Retourner le numéro complet
  return `${year}${month}-${order}`;
}


