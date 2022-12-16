"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.logout = exports.createUserSession = exports.requireUser = exports.requireUserId = exports.getUser = exports.getUserId = exports.getSession = exports.sessionStorage = void 0;
var node_1 = require("@remix-run/node");
var tiny_invariant_1 = require("tiny-invariant");
var user_server_1 = require("~/models/user.server");
tiny_invariant_1["default"](process.env.SESSION_SECRET, "SESSION_SECRET must be set");
exports.sessionStorage = node_1.createCookieSessionStorage({
    cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [process.env.SESSION_SECRET],
        secure: process.env.NODE_ENV === "production"
    }
});
var USER_SESSION_KEY = "userId";
function getSession(request) {
    return __awaiter(this, void 0, void 0, function () {
        var cookie;
        return __generator(this, function (_a) {
            cookie = request.headers.get("Cookie");
            return [2 /*return*/, exports.sessionStorage.getSession(cookie)];
        });
    });
}
exports.getSession = getSession;
function getUserId(request) {
    return __awaiter(this, void 0, Promise, function () {
        var session, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSession(request)];
                case 1:
                    session = _a.sent();
                    userId = session.get(USER_SESSION_KEY);
                    return [2 /*return*/, userId];
            }
        });
    });
}
exports.getUserId = getUserId;
function getUser(request) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserId(request)];
                case 1:
                    userId = _a.sent();
                    if (userId === undefined)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, user_server_1.getUserById(userId)];
                case 2:
                    user = _a.sent();
                    if (user)
                        return [2 /*return*/, user];
                    return [4 /*yield*/, logout(request)];
                case 3: throw _a.sent();
            }
        });
    });
}
exports.getUser = getUser;
function requireUserId(request, redirectTo) {
    if (redirectTo === void 0) { redirectTo = new URL(request.url).pathname; }
    return __awaiter(this, void 0, void 0, function () {
        var userId, searchParams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserId(request)];
                case 1:
                    userId = _a.sent();
                    if (!userId) {
                        searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
                        throw node_1.redirect("/login?" + searchParams);
                    }
                    return [2 /*return*/, userId];
            }
        });
    });
}
exports.requireUserId = requireUserId;
function requireUser(request) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requireUserId(request)];
                case 1:
                    userId = _a.sent();
                    return [4 /*yield*/, user_server_1.getUserById(userId)];
                case 2:
                    user = _a.sent();
                    if (user)
                        return [2 /*return*/, user];
                    return [4 /*yield*/, logout(request)];
                case 3: throw _a.sent();
            }
        });
    });
}
exports.requireUser = requireUser;
function createUserSession(_a) {
    var request = _a.request, userId = _a.userId, remember = _a.remember, redirectTo = _a.redirectTo;
    return __awaiter(this, void 0, void 0, function () {
        var session, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, getSession(request)];
                case 1:
                    session = _g.sent();
                    session.set(USER_SESSION_KEY, userId);
                    _b = node_1.redirect;
                    _c = [redirectTo];
                    _d = {};
                    _e = {};
                    _f = "Set-Cookie";
                    return [4 /*yield*/, exports.sessionStorage.commitSession(session, {
                            maxAge: remember
                                ? 60 * 60 * 24 * 7 // 7 days
                                : undefined
                        })];
                case 2: return [2 /*return*/, _b.apply(void 0, _c.concat([(_d.headers = (_e[_f] = _g.sent(),
                            _e),
                            _d)]))];
            }
        });
    });
}
exports.createUserSession = createUserSession;
function logout(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, getSession(request)];
                case 1:
                    session = _f.sent();
                    _a = node_1.redirect;
                    _b = ["/"];
                    _c = {};
                    _d = {};
                    _e = "Set-Cookie";
                    return [4 /*yield*/, exports.sessionStorage.destroySession(session)];
                case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([(_c.headers = (_d[_e] = _f.sent(),
                            _d),
                            _c)]))];
            }
        });
    });
}
exports.logout = logout;
