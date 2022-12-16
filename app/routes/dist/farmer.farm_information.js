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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.meta = exports.action = void 0;
var CellRow_1 = require("~/components/CellRow");
var zod_1 = require("zod");
var node_1 = require("@remix-run/node");
var domain_functions_1 = require("domain-functions");
var db_server_1 = require("~/db.server");
var form_1 = require("~/components/form/form");
var react_1 = require("@remix-run/react");
var session_server_1 = require("~/session.server");
var client_1 = require("@prisma/client");
// TODO: move into action
// TODO: Fetch data from data store e.g. prisma
var data = {
    cities: ["Lahore", "Rawalpindi"],
    regions: ["Wahdat Road, Lahore", "Nathia Gali, Murree"],
    machinery: ["Tractor", "Leveler"],
    irrigation_sources: ["TubeWell", "Canal"],
    landTypes: ["Nehri", "Behri"]
};
var CropInformationSchema = zod_1.z.object({
    type: zod_1.z.string()
});
var FarmInformationSchema = zod_1.z.object({
    name: zod_1.z.string(),
    city: zod_1.z["enum"](data.cities)["default"](data.cities[0]),
    region: zod_1.z["enum"](data.regions)["default"](data.regions[0]),
    landType: zod_1.z["enum"](data.landTypes)["default"](data.landTypes[0]),
    totalLandSize: zod_1.z.number(),
    machineryAvailable: zod_1.z["enum"](data.machinery)["default"](data.machinery[0]),
    irrigationSource: zod_1.z["enum"](data.irrigation_sources)["default"](data.irrigation_sources[0]),
    _action: zod_1.z.literal("farm_information")
});
var cropInformationMutation = domain_functions_1.makeDomainFunction(CropInformationSchema)(function (values) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, values];
    });
}); });
var farmInformationMutation = domain_functions_1.makeDomainFunction(FarmInformationSchema)(function (values, _a) {
    var userId = _a.userId;
    return __awaiter(void 0, void 0, void 0, function () {
        var farm, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_server_1.prisma.farm.create({
                            data: {
                                name: values.name,
                                total_land: values.totalLandSize,
                                land_type: client_1.LandType[values.landType],
                                // machinery_available: values.machineryAvailable,
                                irrigation_source: client_1.IrrigationSource[values.irrigationSource],
                                pictures: [],
                                user: {
                                    connect: {
                                        id: userId
                                    }
                                }
                            }
                        })];
                case 1:
                    farm = _b.sent();
                    return [2 /*return*/, farm];
                case 2:
                    err_1 = _b.sent();
                    if (err_1 instanceof Error)
                        console.log(err_1.message);
                    return [2 /*return*/, err_1];
                case 3: return [2 /*return*/];
            }
        });
    });
});
exports.action = function (_a) {
    var request = _a.request;
    return __awaiter(void 0, void 0, void 0, function () {
        var session, user, formData, _b, _action, values, farm, err_2, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [4 /*yield*/, session_server_1.getSession(request)];
                case 1:
                    session = _h.sent();
                    return [4 /*yield*/, session_server_1.getUser(request)];
                case 2:
                    user = (_h.sent());
                    return [4 /*yield*/, request.formData()];
                case 3:
                    formData = _h.sent();
                    _b = domain_functions_1.inputFromFormData(formData), _action = _b._action, values = __rest(_b, ["_action"]);
                    if (!(_action === "farm_information")) return [3 /*break*/, 8];
                    _h.label = 4;
                case 4:
                    _h.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, farmInformationMutation(values, { userId: user.id })];
                case 5:
                    farm = _h.sent();
                    if (farm.success) {
                        if (session.has("NO_FARM"))
                            session.unset("NO_FARM");
                        return [2 /*return*/, node_1.redirect("/farmer")];
                    }
                    else {
                        return [2 /*return*/, {
                                error: "Error Occurred While Creating Farm"
                            }];
                    }
                    return [3 /*break*/, 7];
                case 6:
                    err_2 = _h.sent();
                    if (err_2 instanceof Error)
                        console.log(err_2.message);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 13];
                case 8:
                    if (!(_action === "/crop_information")) return [3 /*break*/, 10];
                    return [4 /*yield*/, cropInformationMutation(values)];
                case 9: return [2 /*return*/, _h.sent()];
                case 10:
                    session.set("NO_FARM", true);
                    _c = node_1.redirect;
                    _d = ["/farmer"];
                    _e = {};
                    _f = {};
                    _g = "Set-Cookie";
                    return [4 /*yield*/, session_server_1.sessionStorage.commitSession(session)];
                case 11: return [4 /*yield*/, _c.apply(void 0, _d.concat([(_e.headers = (_f[_g] = _h.sent(),
                            _f),
                            _e)]))];
                case 12: return [2 /*return*/, _h.sent()];
                case 13: return [2 /*return*/];
            }
        });
    });
};
exports.meta = function () {
    return {
        title: "Farm Information"
    };
};
var GeneralInformation = function () {
    var actionData = react_1.useActionData();
    return (React.createElement("div", null,
        React.createElement("header", null, "Farm Information"),
        React.createElement("main", null,
            React.createElement(form_1["default"], { schema: FarmInformationSchema, hiddenFields: ["_action"], values: {
                    _action: "farm_information"
                } }),
            actionData && actionData.error,
            React.createElement(react_1.Form, { method: "post" },
                React.createElement("button", { type: "submit", name: "_action", value: "fill_later" }, "Fill Later"))),
        React.createElement("div", null,
            React.createElement(CellRow_1["default"], { style: { fontWeight: "bold" }, values: ["Crop", "Land Under Crop"] })),
        React.createElement("button", { type: "submit" }, "Save")));
};
exports["default"] = GeneralInformation;
