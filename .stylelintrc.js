module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  plugins: ["stylelint-selector-bem-pattern", "stylelint-use-logical"],
  rules: {
    "csstools/use-logical": "always" || true || "ignore" || false || null,
  },
};
