const fs = require("fs").promises;
const path = require("path");

/**
 * Crée un dossier s'il n'existe pas déjà et retourne son chemin
 * @param {string} parentDir - Le chemin du dossier parent (doit déjà exister)
 * @param {string} newFolderName - Nom du nouveau dossier à créer
 * @returns {Promise<string>} - Chemin du dossier créé ou existant
 */
async function createFolderIfNotExists(parentDir, newFolderName) {
  try {
    // Vérifie si le dossier parent existe
    const parentStats = await fs.stat(parentDir);
    if (!parentStats.isDirectory()) {
      throw new Error(`❌ Le chemin "${parentDir}" n'est pas un dossier valide.`);
    }

    const newDirPath = path.join(parentDir, newFolderName);

    // Vérifie si le dossier existe déjà
    try {
      await fs.access(newDirPath);
      // console.log(`✅ Le dossier existe déjà : ${newDirPath}`);
    } catch {
      // Si non existant, on le crée
      await fs.mkdir(newDirPath, { recursive: true });
      // console.log(`📂 Nouveau dossier créé : ${newDirPath}`);
    }

    // Retourne le chemin du dossier (créé ou déjà existant)
    return newDirPath;
  } catch (err) {
    console.error(`⚠️ Erreur : ${err.message}`);
    throw err;
  }
}

module.exports = createFolderIfNotExists
