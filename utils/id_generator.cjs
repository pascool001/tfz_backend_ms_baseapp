// id-generator.cjs
const { v4: uuidv4 } = require('uuid');
const { ulid } = require('ulid');
const { nanoid, customAlphabet } = require('nanoid');

/**
 * Génère un identifiant unique selon le type choisi.
 * @param {'uuid' | 'uuid-timestamp' | 'ulid' | 'nanoid' | 'nanoid-long'} type
 * @returns {string} Identifiant généré
 */
function generateId(type = 'uuid') {
  switch (type) {
    case 'uuid':
      // UUID v4 classique
      return uuidv4();

    case 'uuid-timestamp':
      // UUID combiné avec un timestamp pour tri chronologique
      return `${Date.now().toString(36)}-${uuidv4()}`;

    case 'ulid':
      // ULID triable par date
      return ulid();

    case 'nanoid':
      // NanoID court et rapide (21 caractères)
      return nanoid();

    case 'nanoid-long':
      // NanoID long et ultra aléatoire (64 caractères)
      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const generateLongNanoId = customAlphabet(alphabet, 64);
      return generateLongNanoId();

    default:
      throw new Error(`Type inconnu : ${type}`);
  }
}

module.exports = { generateId };
