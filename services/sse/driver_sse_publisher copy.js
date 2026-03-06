const { createClient } = require('redis');

const CHANNEL_PREFIX = 'driver:messages:'; // Canal pub/sub par chauffeur
const PENDING_KEY_PREFIX = 'driver:pending:'; // Liste Redis des messages en attente
const PENDING_TTL = 60 * 60 * 24; // TTL des messages en attente : 24h
// messageTypes:PAYMENT_NOTIFICATION, PAYMENT_PENDING, PAYMENT_SUCCESS, PAYMENT_FAILURE, PAYMENT_CONFIRMED etc.
class Driver_sse {

    constructor() {
        if (Driver_sse.instance) {
            return Driver_sse.instance; 
        }
        // Client publisher : pour publier les notifications
        this.publisher = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379'});

        this._connect();
        Driver_sse.instance = this;
    }

    async _connect() {
        await this.publisher.connect();
        console.log('Driver_notify Connecté à Redis.');
    }


    async notify(driverId, data, msgType = 'PAYMENT_NOTIFICATION') {
        const payload = JSON.stringify({ type: msgType, ...data });
        // Le chauffeur est connecté → publication sur son canal
        await this.publisher.publish(CHANNEL_PREFIX + driverId, payload);

        // if (this.driverRes.has(driverId)) {
        //     return true;
        // } else {
        //     // Le chauffeur est hors-ligne → mise en file d'attente persistante
        //     const pendingKey = PENDING_KEY_PREFIX + driverId;
        //     await this.publisher.rPush(pendingKey, payload);
        //     await this.publisher.expire(pendingKey, PENDING_TTL);
        //     return false;
        // }
    }


    static getInstance() {
        if (!Driver_sse.instance) {
            Driver_sse.instance = new Driver_sse();
        }
        return Driver_sse.instance;
    }
}

module.exports = Driver_sse.getInstance();
