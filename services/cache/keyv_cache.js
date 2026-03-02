const {Keyv, KeyvHooks} = require("keyv")
const KeyvMongo = require("@keyv/mongo").default;

class KeyvCache {
    #Tokencache;
    #Otpcache;
    #Tranfertcache;
    #SerialCache;
    constructor() {
        
        if (KeyvCache.instance) {
            return KeyvCache.instance;
        }

        KeyvCache.instance = this;
        // 30000 ms = 30 s
        this.#Tokencache = new Keyv({ttl: 600000, namespace: 'token'}) //5m / 900 sec ou 15 minutes
        this.#Tranfertcache = new Keyv({ttl: 900000, namespace: 'transfert'}) //900 sec ou 15 minutes
        this.#Otpcache = new Keyv({ttl: 60000, namespace: 'otp'}) //60 sec

        // --- persistance spm_serial_number dans mongoDb, combiné à un cache ---
        const mongoStore = new KeyvMongo({uri: process.env.DB_URL, collection: 'spm_serials_state', });
        const memoryCache = new Keyv();
        this.#SerialCache = new Keyv({ store: mongoStore, cache: memoryCache, namespace: 'serial' });
        
        this.#Tokencache.hooks.addHandler(KeyvHooks.POST_SET, (key, value) => {
            console.log("POST_SET kEY: ", key, "  Date:", new Date().toISOString())
        });

        this.#Tokencache.hooks.addHandler(KeyvHooks.POST_DELETE, (key, value) => {
            // console.log("Post_delete key: ", key, "  Date: ", new Date().toISOString()) 
        });
        
    }

      async getOtp(key) {
        return await this.#Otpcache.get(key);
    }

    async setOtp(key, data) {
        await this.#Otpcache.set(key, data) //  30 seconds;
        let cached = await this.getOtp(key)
        return cached
    }

    async getTokenData(key) {
        return await this.#Tokencache.get(key);
    }

    async setTokenData(key, data) {
        await this.#Tokencache.set(key, data) //  10 seconds;
        let cached = await this.getTokenData(key)
        return cached
    }

     async setDataIfNotExist(key, data) {
        if (!(await this.getTokenData(key))) {
            await this.#Tokencache.set(key, data) 
        }
    }

    async getTranfertData(key) {
        const value = await this.#Tranfertcache.get(key);
        return value
    }

    async setTransfertData(key, data) {
        const value = await this.#Tranfertcache.set(key, data) //  10 seconds;
        return value
    }

    // --- Nouveau : Serial methods ---
    async getSerialState() {
        return await this.#SerialCache.get('serial_state');
    }

    async setSerialState(state) {
        await this.#SerialCache.set('serial_state', state);
    }

}

module.exports = KeyvCache;