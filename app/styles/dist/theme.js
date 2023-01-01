"use strict";
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var heading_1 = require("./components/heading");
var colors = {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    cabi: "#368729",
    wheat: "#feffe6"
};
var config = {
    initialColorMode: "light",
    useSystemColorMode: true
};
var theme = react_1.extendTheme({
    colors: colors,
    config: config,
    components: {
        Heading: heading_1["default"]
    }
});
exports["default"] = theme;
