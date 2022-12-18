const { flatRoutes } = require("remix-flat-routes");
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
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes, {
      basePath: "/",
      paramPrefixChar: "$",
    });
  },

  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
};
