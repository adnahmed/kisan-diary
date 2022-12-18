"use strict";

var _require = require("remix-flat-routes"),
    flatRoutes = _require.flatRoutes;
/**
 * @type {import('@remix-run/dev').AppConfig}
 */


module.exports = {
  /* build paths */
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  //   /* cache */
  //   /* ignored */
  devServerPort: 3000,
  routes: function routes(defineRoutes) {
    return regeneratorRuntime.async(function routes$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", flatRoutes("routes", defineRoutes, {
              basePath: "/",
              paramPrefixChar: "$"
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"]
};