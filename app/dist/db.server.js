"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var client_1 = require("@prisma/client");
var tiny_invariant_1 = require("tiny-invariant");
var prisma;
exports.prisma = prisma;
// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
    exports.prisma = prisma = getClient();
}
else {
    if (!global.__db__) {
        global.__db__ = getClient();
    }
    exports.prisma = prisma = global.__db__;
}
function getClient() {
    var DATABASE_URL = process.env.DATABASE_URL;
    tiny_invariant_1["default"](typeof DATABASE_URL === "string", "DATABASE_URL env var not set");
    var databaseUrl = new URL(DATABASE_URL);
    var isLocalHost = databaseUrl.hostname === "localhost";
    var PRIMARY_REGION = isLocalHost ? null : process.env.PRIMARY_REGION;
    var FLY_REGION = isLocalHost ? null : process.env.FLY_REGION;
    var isReadReplicaRegion = !PRIMARY_REGION || PRIMARY_REGION === FLY_REGION;
    if (!isLocalHost) {
        databaseUrl.host = FLY_REGION + "." + databaseUrl.host;
        if (!isReadReplicaRegion) {
            // 5433 is the read-replica port
            databaseUrl.port = "5433";
        }
    }
    console.log("\uD83D\uDD0C setting up prisma client to " + databaseUrl.host);
    // NOTE: during development if you change anything in this function, remember
    // that this only runs once per server restart and won't automatically be
    // re-run per request like everything else is. So if you need to change
    // something in this file, you'll need to manually restart the server.
    var client = new client_1.PrismaClient({
        datasources: {
            db: {
                url: databaseUrl.toString()
            }
        }
    });
    // connect eagerly
    client.$connect();
    return client;
}
