/**
 * @file trustedGateway.js
 * @description Internal authentication middlewares for microservices.
 *
 * Architecture:
 *
 *  gatewayOnly    → registered globally in index.js via app.use()
 *                   Runs on EVERY request. Guarantees the microservice
 *                   is never reachable from outside the Gateway.
 *
 *  gatewayAndUser → registered only on private routes.
 *                   Assumes gatewayOnly already ran — only adds user identity check.
 *                   Does NOT re-verify the PSK.
 *
 * ─── index.js (microservice entry point) ────────────────────────────────────
 *
 *   const { gatewayOnly, gatewayAndUser } = require('./middlewares/trustedGateway');
 *
 *   app.use(gatewayOnly);                               // ← global guard
 *
 *   app.post('/auth/login',    loginHandler);           // public  — PSK already checked
 *   app.post('/auth/register', registerHandler);        // public  — PSK already checked
 *
 *   app.get('/profile',        gatewayAndUser, profileHandler);   // private
 *   app.get('/orders',         gatewayAndUser, ordersHandler);    // private
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

"use strict";

// ─── Fail-fast at startup ─────────────────────────────────────────────────────

const INTERNAL_KEY = process.env.INTERNAL_KEY;

if (!INTERNAL_KEY || INTERNAL_KEY.length < 32) {
  throw new Error(
    "[trustedGateway] FATAL: INTERNAL_KEY is missing or too short (minimum 32 characters). " +
    "The microservice cannot start without a valid internal key."
  );
}

// ─── Middleware 1 — gatewayOnly ───────────────────────────────────────────────
// Register once at app level: app.use(gatewayOnly)
// Protects the entire microservice — no request gets through without the PSK.

/**
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const gatewayOnly = (req, res, next) => {
  if (req.headers["x-internal-key"] !== INTERNAL_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }
  return next();
};

// ─── Middleware 2 — gatewayAndUser ────────────────────────────────────────────
// Register on private routes only: app.get('/profile', gatewayAndUser, handler)
// PSK is guaranteed to have passed already — only resolves user identity.

/**
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const gatewayAndUser = (req, res, next) => {
  const userId    = req.headers["x-user-id"];
  const userEmail = req.headers["x-user-email"];

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = {
    userId,
    email: userEmail ?? null,
  };

  return next();
};

module.exports = { gatewayOnly, gatewayAndUser };
