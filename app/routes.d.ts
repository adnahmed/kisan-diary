declare module "routes-gen" {
  export type RouteParams = {
    "/api/fetch_replies": Record<string, never>;
    "/forgot_password": Record<string, never>;
    "/api/save_files": Record<string, never>;
    "/api/save_file": Record<string, never>;
    "/healthcheck": Record<string, never>;
    "/IndexPage": Record<string, never>;
    "/api/user": Record<string, never>;
    "/dev/null": Record<string, never>;
    "/expert": Record<string, never>;
    "/expert/manage-alerts-recommendations/create_alert": Record<string, never>;
    "/expert/manage-alerts-recommendations": Record<string, never>;
    "/expert/knowledge-bank": Record<string, never>;
    "/expert/farmer-issues": Record<string, never>;
    "/expert/messages": Record<string, never>;
    "/expert/farmers": Record<string, never>;
    "/expert/manuals": Record<string, never>;
    "/expert/home": Record<string, never>;
    "/farmer": Record<string, never>;
    "/farmer/farm-information": Record<string, never>;
    "/farmer/crop/:cropId": { "cropId": string };
    "/farmer/crop/:cropId/:comments_and_recommendations": { "cropId": string, "comments_and_recommendations": string };
    "/farmer/crop/:cropId/economic_analysis": { "cropId": string };
    "/farmer/crop/:cropId/land_preparation": { "cropId": string };
    "/farmer/crop/:cropId/post_harvesting": { "cropId": string };
    "/farmer/crop/:cropId/:Information": { "cropId": string, "Information": string };
    "/farmer/crop/:cropId/harvesting": { "cropId": string };
    "/farmer/crop/:cropId/all_costs": { "cropId": string };
    "/farmer/crop/:cropId/marketing": { "cropId": string };
    "/farmer/crop/:cropId/inputs": { "cropId": string };
    "/farmer/crop/:cropId/inputs/integrated_disease_management": { "cropId": string };
    "/farmer/crop/:cropId/inputs/integrated_pest_management": { "cropId": string };
    "/farmer/crop/:cropId/inputs/integrated_weed_management": { "cropId": string };
    "/farmer/crop/:cropId/inputs/nutrient_management": { "cropId": string };
    "/farmer/crop/:cropId/inputs/labor_management": { "cropId": string };
    "/farmer/crop/:cropId/inputs/irrigation": { "cropId": string };
    "/farmer/crop/:cropId/inputs/seed": { "cropId": string };
    "/farmer/crop/:cropId/sowing": { "cropId": string };
    "/farmer/crops": Record<string, never>;
    "/farmer/crops/year_select": Record<string, never>;
    "/farmer/help": Record<string, never>;
    "/farmer/help/post": Record<string, never>;
    "/farmer/home": Record<string, never>;
    "/": Record<string, never>;
    "/logout": Record<string, never>;
    "/join": Record<string, never>;
    "/login": Record<string, never>;
  };

  export function route<
    T extends
      | ["/api/fetch_replies"]
      | ["/forgot_password"]
      | ["/api/save_files"]
      | ["/api/save_file"]
      | ["/healthcheck"]
      | ["/IndexPage"]
      | ["/api/user"]
      | ["/dev/null"]
      | ["/expert"]
      | ["/expert/manage-alerts-recommendations/create_alert"]
      | ["/expert/manage-alerts-recommendations"]
      | ["/expert/knowledge-bank"]
      | ["/expert/farmer-issues"]
      | ["/expert/messages"]
      | ["/expert/farmers"]
      | ["/expert/manuals"]
      | ["/expert/home"]
      | ["/farmer"]
      | ["/farmer/farm-information"]
      | ["/farmer/crop/:cropId", RouteParams["/farmer/crop/:cropId"]]
      | ["/farmer/crop/:cropId/:comments_and_recommendations", RouteParams["/farmer/crop/:cropId/:comments_and_recommendations"]]
      | ["/farmer/crop/:cropId/economic_analysis", RouteParams["/farmer/crop/:cropId/economic_analysis"]]
      | ["/farmer/crop/:cropId/land_preparation", RouteParams["/farmer/crop/:cropId/land_preparation"]]
      | ["/farmer/crop/:cropId/post_harvesting", RouteParams["/farmer/crop/:cropId/post_harvesting"]]
      | ["/farmer/crop/:cropId/:Information", RouteParams["/farmer/crop/:cropId/:Information"]]
      | ["/farmer/crop/:cropId/harvesting", RouteParams["/farmer/crop/:cropId/harvesting"]]
      | ["/farmer/crop/:cropId/all_costs", RouteParams["/farmer/crop/:cropId/all_costs"]]
      | ["/farmer/crop/:cropId/marketing", RouteParams["/farmer/crop/:cropId/marketing"]]
      | ["/farmer/crop/:cropId/inputs", RouteParams["/farmer/crop/:cropId/inputs"]]
      | ["/farmer/crop/:cropId/inputs/integrated_disease_management", RouteParams["/farmer/crop/:cropId/inputs/integrated_disease_management"]]
      | ["/farmer/crop/:cropId/inputs/integrated_pest_management", RouteParams["/farmer/crop/:cropId/inputs/integrated_pest_management"]]
      | ["/farmer/crop/:cropId/inputs/integrated_weed_management", RouteParams["/farmer/crop/:cropId/inputs/integrated_weed_management"]]
      | ["/farmer/crop/:cropId/inputs/nutrient_management", RouteParams["/farmer/crop/:cropId/inputs/nutrient_management"]]
      | ["/farmer/crop/:cropId/inputs/labor_management", RouteParams["/farmer/crop/:cropId/inputs/labor_management"]]
      | ["/farmer/crop/:cropId/inputs/irrigation", RouteParams["/farmer/crop/:cropId/inputs/irrigation"]]
      | ["/farmer/crop/:cropId/inputs/seed", RouteParams["/farmer/crop/:cropId/inputs/seed"]]
      | ["/farmer/crop/:cropId/sowing", RouteParams["/farmer/crop/:cropId/sowing"]]
      | ["/farmer/crops"]
      | ["/farmer/crops/year_select"]
      | ["/farmer/help"]
      | ["/farmer/help/post"]
      | ["/farmer/home"]
      | ["/"]
      | ["/logout"]
      | ["/join"]
      | ["/login"]
  >(...args: T): typeof args[0];
}
