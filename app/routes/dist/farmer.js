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
exports.action = exports.loader = void 0;
var react_1 = require("react");
var react_2 = require("@remix-run/react");
var glowy_button_1 = require("~/components/glowy_button");
var node_1 = require("@remix-run/node");
var db_server_1 = require("~/db.server");
var session_server_1 = require("~/session.server");
var zod_1 = require("zod");
var form_1 = require("~/components/form/form");
var domain_functions_1 = require("domain-functions");
function getFarmWithCrops(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_server_1.prisma.farm.findUnique({
                        where: {
                            owner: user === null || user === void 0 ? void 0 : user.id
                        },
                        include: {
                            crops: true
                        }
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var session, user, farm, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, session_server_1.getSession(request)];
                case 1:
                    session = _b.sent();
                    return [4 /*yield*/, session_server_1.getUser(request)];
                case 2:
                    user = _b.sent();
                    if (!!session.has("NO_FARM")) return [3 /*break*/, 6];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, getFarmWithCrops(user)];
                case 4:
                    farm = _b.sent();
                    return [2 /*return*/, {
                            user: user,
                            farm: farm || undefined,
                            crops: farm === null || farm === void 0 ? void 0 : farm.crops
                        }];
                case 5:
                    err_1 = _b.sent();
                    // Couldn't find farm.
                    return [2 /*return*/, node_1.redirect("farm_information")];
                case 6: return [2 /*return*/, { user: user }];
            }
        });
    });
}
exports.loader = loader;
function action(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var formData, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, request.formData()];
                case 1:
                    formData = _b.sent();
                    values = domain_functions_1.inputFromFormData(formData);
                    return [2 /*return*/];
            }
        });
    });
}
exports.action = action;
var CropSchema = zod_1.z.object({
    name: zod_1.z.string()
});
function Dashboard(props) {
    var _a = react_2.useLoaderData(), farm = _a.farm, user = _a.user, crops = _a.crops;
    var _b = react_1.useState(false), showNewCropForm = _b[0], setShowNewCropForm = _b[1];
    return (React.createElement("div", { className: "dashboard" },
        farm !== undefined ? (React.createElement("div", null, farm.name)) : (React.createElement("div", null,
            React.createElement("span", null, "You haven't set any Farm Information but you will still recieve alerts and recommendations based on your region."),
            React.createElement("span", null,
                "To add crops and access other functionality,",
                " ",
                React.createElement(react_2.NavLink, { to: "farm_information" }, "Fill Now")))),
        crops && (React.createElement("div", null,
            !showNewCropForm && (React.createElement("button", { onClick: function () { return setShowNewCropForm(!showNewCropForm); } },
                React.createElement(glowy_button_1["default"], null,
                    React.createElement("b", { style: { color: "blue" } }, "New Crop")))),
            showNewCropForm && React.createElement(form_1["default"], { schema: CropSchema }),
            React.createElement("div", { className: "CropSelection", style: { display: "flex", flexDirection: "column" } },
                React.createElement("div", { style: { display: "flex" } },
                    React.createElement("b", { style: { flex: "1", color: "green", fontSize: "xxx-large" } }, "Crops")),
                crops.map(function (crop) { return (React.createElement("div", { key: crop.id, id: "dashboard-table", style: { display: "flex" } },
                    React.createElement("div", { id: "dashboard-table-row", style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "space-between",
                            flex: "1",
                            maxWidth: "300px",
                            alignItems: "center"
                        } },
                        React.createElement(glowy_button_1["default"], null,
                            React.createElement(react_2.Link, { to: "/crop/" + crop.fullName }, crop.fullName)),
                        React.createElement("img", { style: {
                                display: "inline",
                                borderWidth: "1px",
                                maxHeight: "200px"
                            }, alt: crop.fullName + " Image", src: "assets/" + crop.fullName.toLowerCase() + ".jpg" })))); })))),
        React.createElement(react_2.Form, { method: "post", action: "/logout" },
            React.createElement("button", { type: "submit" }, "Logout"))));
}
exports["default"] = Dashboard;
