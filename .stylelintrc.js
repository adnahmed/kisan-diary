module.exports = {
  extends: [
    // "stylelint-config-standard",
    "stylelint-config-prettier",
    // "stylelint-config-idiomatic-order",
    "stylelint-config-rational-order",
  ],
  plugins: [
    "stylelint-selector-bem-pattern",
    "stylelint-use-logical",
    "stylelint-order",
    "stylelint-config-rational-order/plugin",
    "stylelint-group-selectors",
    "stylelint-media-use-custom-media",
  ],

  rules: {
    "csstools/media-use-custom-media":
      "always" || "always-known" || "known" || "never" || "ignore",
    "plugin/stylelint-group-selectors": true,
    "csstools/use-logical": "always" || true || "ignore" || false || null,
    "selector-class-pattern":
      "^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$",
    "order/order": ["custom-properties", "declarations"],
    "order/properties-order": [],
    "plugin/rational-order": [
      true,
      {
        "border-in-box-model": false,
        "empty-line-between-groups": false,
      },
    ],
  },
};
