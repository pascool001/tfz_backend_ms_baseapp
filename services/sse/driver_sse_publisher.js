const { createClient } = require('redis');

const CHANNEL_PREFIX = 'driver:messages:';
const PENDING_KEY_PREFIX = 'driver:pending:';
const PENDING_TTL = 60 * 60 * 24; // 24h

class DriverSSE_Publisher {
    constructor() {
        if (DriverSSE_Publisher.instance) return DriverSSE_Publisher.instance;

        this.publisher = createClient({ url: process.env.REDIS_URL });
        this._connect();

        DriverSSE_Publisher.instance = this;
    }

    async _connect() {
        await this.publisher.connect();
        console.log('[DriverSSE_Publisher] Connecté à Redis.');
    }

    /**
     * Notifie un chauffeur.
     * - Publie sur le canal Redis si le chauffeur est connecté (ms_notify le reçoit)
     * - Sinon stocke en liste persistante pour livraison différée
     */
    //driverId, data, msgType = "PAYMENT_NOTIFICATION"
    async notify(driverId, data, msgType = "PAYMENT_NOTIFICATION") {
        const payload = JSON.stringify({ type: msgType, ...data });
        const channel = CHANNEL_PREFIX + driverId;

        // Vérifie s'il y a des abonnés actifs sur le canal (= chauffeur connecté)
        const subscribers = await this.publisher.pubSubNumSub(channel);
        const isOnline = (subscribers[channel] ?? 0) > 0;

        if (isOnline) {
            await this.publisher.publish(channel, payload);
            console.log(`[Publisher] Notification envoyée au driver ${driverId}.`);
            return true;
        } else {
            const pendingKey = PENDING_KEY_PREFIX + driverId;
            await this.publisher.rPush(pendingKey, payload);
            await this.publisher.expire(pendingKey, PENDING_TTL);
            console.log(`[Publisher] Driver ${driverId} hors-ligne — message mis en attente.`);
            return false;
        }
    }

    static getInstance() {
        if (!DriverSSE_Publisher.instance) {
            new DriverSSE_Publisher();
        }
        return DriverSSE_Publisher.instance;
    }
}

module.exports = DriverSSE_Publisher.getInstance();