const HyperExpress = require("hyper-express");
const webserver = new HyperExpress.Server();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { gatewayOnly } = require("./middlewares/trustedGateway");
const port = process.env.SERVER_PORT || 8080;
const host = process.env.SERVER_HOST || "127.0.0.1";
const root_api_prefix = process.env.ROOT_API_PREFIX;

const { connectDB } = require("./database/mongodb/connection");

connectDB();

//Securisation basique : vérification d'une clé interne dans les headers pour les requêtes entrantes
// S'assurer que l'appel vient du gateway.
webserver.use(gatewayOnly);

webserver.use(cookieParser());

Object.keys(require("./routes")).forEach((key) => {
  webserver.use(`${root_api_prefix}`, require("./routes")[key]);
});

webserver
  .listen(port || 5000, host)
  .then(async () => {
    console.log(`Webserver started on http://${host}:${port}`);
  })
  .catch((err) => console.log("Failed to start webserver"));
