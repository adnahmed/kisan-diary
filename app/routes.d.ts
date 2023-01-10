declare module "routes-gen" {
  export type RouteParams = {
    "/farm_functions/:comments_and_recommendations": { "comments_and_recommendations": string };
    "/farm_functions/economic_analysis": Record<string, never>;
    "/farm_functions/land_preparation": Record<string, never>;
    "/farm_functions/post_harvesting": Record<string, never>;
    "/farm_functions/:Information": { "Information": string };
    "/farm_functions/inputs_crop": Record<string, never>;
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
    "/api/fetch_replies": Record<string, never>;
    "/api/unread_alerts": Record<string, never>;
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
      | ["/farm_functions/:comments_and_recommendations", RouteParams["/farm_functions/:comments_and_recommendations"]]
      | ["/farm_functions/economic_analysis"]
      | ["/farm_functions/land_preparation"]
      | ["/farm_functions/post_harvesting"]
      | ["/farm_functions/:Information", RouteParams["/farm_functions/:Information"]]
      | ["/farm_functions/inputs_crop"]
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
      | ["/api/fetch_replies"]
      | ["/api/unread_alerts"]
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
