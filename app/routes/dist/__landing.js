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
exports.ErrorBoundary = exports.CatchBoundary = exports.links = exports.loader = void 0;
var node_1 = require("@remix-run/node");
var session_server_1 = require("~/session.server");
var index_css_1 = require("~/styles/routes/index.css");
var react_1 = require("@remix-run/react");
var react_2 = require("@chakra-ui/react");
var react_3 = require("@remix-run/react");
var remix_image_1 = require("remix-image");
function loader(_a) {
    var request = _a.request;
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, session_server_1.getUser(request)];
                case 1:
                    user = _b.sent();
                    if (user)
                        return [2 /*return*/, node_1.redirect("/" + user.role)];
                    else
                        return [2 /*return*/, null];
                    return [2 /*return*/];
            }
        });
    });
}
exports.loader = loader;
exports.links = function () { return [
    {
        href: index_css_1["default"],
        rel: "stylesheet"
    },
    {
        rel: "preload",
        href: "/public/favicon.ico"
    },
]; };
function CatchBoundary() {
    var caught = react_1.useCatch();
    return (React.createElement("div", null,
        React.createElement("h1", null, "Caught"),
        React.createElement("p", null,
            "Status: ",
            caught.status),
        React.createElement("pre", null,
            React.createElement("code", null, JSON.stringify(caught.data, null, 2)))));
}
exports.CatchBoundary = CatchBoundary;
function ErrorBoundary(_a) {
    var error = _a.error;
    return (React.createElement("div", null,
        React.createElement("h1", null, "Error"),
        React.createElement("p", null, error.message),
        React.createElement("p", null, "The stack trace is:"),
        React.createElement("pre", null, error.stack)));
}
exports.ErrorBoundary = ErrorBoundary;
function LandingPage() {
    var _a = react_2.useDisclosure(), isOpenLogIn = _a.isOpen, onOpenLogIn = _a.onOpen, onCloseLogIn = _a.onClose;
    return (React.createElement("div", null,
        React.createElement("div", { className: "header" },
            React.createElement(remix_image_1.Image, { src: "diary.png", className: "logo", responsive: [
                    {
                        size: { width: 100, height: 100 },
                        maxWidth: 500
                    },
                    {
                        size: { width: 150, height: 150 }
                    },
                ], dprVariants: [1, 3], loaderUrl: "./image" }),
            React.createElement("a", { href: "/", className: "title" }, "Kesan Diary"),
            React.createElement("div", { className: "menu" },
                React.createElement(react_3.Link, { to: "/join" },
                    React.createElement("div", { className: "join" }, "Sign Up")),
                React.createElement(react_3.Link, { to: "login" },
                    React.createElement("div", { onClick: onOpenLogIn, className: "login" }, "Log In")))),
        React.createElement(react_2.Modal, { blockScrollOnMount: false, isOpen: isOpenLogIn, onClose: onCloseLogIn },
            React.createElement(react_2.ModalOverlay, { bg: "none" }),
            React.createElement(react_2.ModalContent, null,
                React.createElement(react_2.ModalHeader, null, "Log In"),
                React.createElement(react_2.ModalCloseButton, null),
                React.createElement(react_2.ModalBody, null,
                    React.createElement(react_3.Outlet, null)))),
        React.createElement("div", { className: "content-wrapper" },
            React.createElement("div", { className: "promo-bg content" },
                React.createElement("div", { className: "content-row" },
                    React.createElement("div", { className: "content-card content-card-1" },
                        React.createElement(remix_image_1.Image, { options: {
                                fit: "contain"
                            }, src: "/assets/index-content-row-1.jpeg", alt: "" })),
                    React.createElement("div", { className: "content-card content-card-2" })),
                React.createElement("div", { className: "content-row" },
                    React.createElement("div", { className: "content-card content-card-4" }),
                    React.createElement("div", { className: "content-card content-card-5" })),
                React.createElement("div", { className: "content-row" },
                    React.createElement("div", { className: "content-card content-card-4" }),
                    React.createElement("div", { className: "content-card content-card-5" })))),
        React.createElement("footer", null,
            React.createElement("div", { className: "ProjectDescription" },
                React.createElement("span", null,
                    "Developed by ",
                    React.createElement("strong", null, "Adnan Ahmed Khan")),
                React.createElement("span", null,
                    "Arid # ",
                    React.createElement("strong", null, "2018-ARID-0957")),
                React.createElement("span", null,
                    "Under Supervision of ",
                    React.createElement("strong", null, "Mrs. Tayyaba")),
                React.createElement("span", null,
                    "Submitted to",
                    " ",
                    React.createElement("strong", null, "Barani Institute of Information Technology (BIIT) affliated with PMAS Arid Agriculture University, Rawalpindi Pakistan"))),
            React.createElement("div", { className: "Copyright" }, " \u00A9 Copyright Reserved 2022"))));
}
exports["default"] = LandingPage;
