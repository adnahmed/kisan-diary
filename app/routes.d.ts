declare module "routes-gen" {
  export type RouteParams = {
    "/api/fetch_replies": Record<string, never>;
    "/api/unread_alerts": Record<string, never>;
    "/forgot_password": Record<string, never>;
    "/api/save_files": Record<string, never>;
    "/farm_functions": Record<string, never>;
    "/farm_functions/:comments_and_recommendations": { "comments_and_recommendations": string };
    "/farm_functions/economic_analysis": Record<string, never>;
    "/farm_functions/land_preparation": Record<string, never>;
    "/farm_functions/post_harvesting": Record<string, never>;
    "/farm_functions/:Information": { "Information": string };
    "/farm_functions/inputs_crop": Record<string, never>;
    "/farm_functions/inputs_crop/dist/integrated_pest_management": Record<string, never>;
    "/farm_functions/inputs_crop/integrated_disease_management": Record<string, never>;
    "/farm_functions/inputs_crop/integrated_pest_management": Record<string, never>;
    "/farm_functions/inputs_crop/integrated_weed_management": Record<string, never>;
    "/farm_functions/inputs_crop/nutrient_management": Record<string, never>;
    "/farm_functions/inputs_crop/gross_inputs_cost": Record<string, never>;
    "/farm_functions/inputs_crop/labor_management": Record<string, never>;
    "/farm_functions/inputs_crop/irrigation": Record<string, never>;
    "/farm_functions/inputs_crop/seed": Record<string, never>;
    "/farm_functions/harvesting": Record<string, never>;
    "/farm_functions/all_costs": Record<string, never>;
    "/farm_functions/marketing": Record<string, never>;
    "/farm_functions/sowing": Record<string, never>;
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
    "/farmer/crop/:cropId/post_harvesting_and_storage": { "cropId": string };
    "/farmer/crop/:cropId/economic_analysis": { "cropId": string };
    "/farmer/crop/:cropId/land_preparation": { "cropId": string };
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
    "/image": Record<string, never>;
    "/login": Record<string, never>;
    "/app": Record<string, never>;
    "/app/admin/alerts/create_alert": Record<string, never>;
    "/app/farmer/crop/land-preparation": Record<string, never>;
    "/app/farmer/farm_information": Record<string, never>;
    "/app/farmer/year_select": Record<string, never>;
    "/app/forgot_password": Record<string, never>;
    "/app/farmer/crops": Record<string, never>;
    "/app/farmer/crop": Record<string, never>;
    "/app/farmer/home": Record<string, never>;
    "/app/admin": Record<string, never>;
    "/app/admin/alerts": Record<string, never>;
    "/app/admin/crops": Record<string, never>;
    "/app/admin/crops/add_crop": Record<string, never>;
    "/app/login": Record<string, never>;
  };

  export function route<
    T extends
      | ["/api/fetch_replies"]
      | ["/api/unread_alerts"]
      | ["/forgot_password"]
      | ["/api/save_files"]
      | ["/farm_functions"]
      | ["/farm_functions/:comments_and_recommendations", RouteParams["/farm_functions/:comments_and_recommendations"]]
      | ["/farm_functions/economic_analysis"]
      | ["/farm_functions/land_preparation"]
      | ["/farm_functions/post_harvesting"]
      | ["/farm_functions/:Information", RouteParams["/farm_functions/:Information"]]
      | ["/farm_functions/inputs_crop"]
      | ["/farm_functions/inputs_crop/dist/integrated_pest_management"]
      | ["/farm_functions/inputs_crop/integrated_disease_management"]
      | ["/farm_functions/inputs_crop/integrated_pest_management"]
      | ["/farm_functions/inputs_crop/integrated_weed_management"]
      | ["/farm_functions/inputs_crop/nutrient_management"]
      | ["/farm_functions/inputs_crop/gross_inputs_cost"]
      | ["/farm_functions/inputs_crop/labor_management"]
      | ["/farm_functions/inputs_crop/irrigation"]
      | ["/farm_functions/inputs_crop/seed"]
      | ["/farm_functions/harvesting"]
      | ["/farm_functions/all_costs"]
      | ["/farm_functions/marketing"]
      | ["/farm_functions/sowing"]
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
      | ["/farmer/crop/:cropId/post_harvesting_and_storage", RouteParams["/farmer/crop/:cropId/post_harvesting_and_storage"]]
      | ["/farmer/crop/:cropId/economic_analysis", RouteParams["/farmer/crop/:cropId/economic_analysis"]]
      | ["/farmer/crop/:cropId/land_preparation", RouteParams["/farmer/crop/:cropId/land_preparation"]]
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
      | ["/image"]
      | ["/login"]
      | ["/app"]
      | ["/app/admin/alerts/create_alert"]
      | ["/app/farmer/crop/land-preparation"]
      | ["/app/farmer/farm_information"]
      | ["/app/farmer/year_select"]
      | ["/app/forgot_password"]
      | ["/app/farmer/crops"]
      | ["/app/farmer/crop"]
      | ["/app/farmer/home"]
      | ["/app/admin"]
      | ["/app/admin/alerts"]
      | ["/app/admin/crops"]
      | ["/app/admin/crops/add_crop"]
      | ["/app/login"]
  >(...args: T): typeof args[0];
}
