declare module "routes-gen" {
  export type RouteParams = {
    "/api/new_financial_data": Record<string, never>;
    "/api/fetch_document": Record<string, never>;
    "/api/fetch_replies": Record<string, never>;
    "/api/save_document": Record<string, never>;
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
    "/farmer/crop/:cropId/financial_data": { "cropId": string };
    "/farmer/crop/:cropId/:Information": { "cropId": string, "Information": string };
    "/farmer/crops": Record<string, never>;
    "/farmer/crops/year_select": Record<string, never>;
    "/farmer/help": Record<string, never>;
    "/farmer/help/post": Record<string, never>;
    "/farmer/home": Record<string, never>;
    "/": Record<string, never>;
    "/logout": Record<string, never>;
    "/login": Record<string, never>;
  };

  export function route<
    T extends
      | ["/api/new_financial_data"]
      | ["/api/fetch_document"]
      | ["/api/fetch_replies"]
      | ["/api/save_document"]
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
      | ["/farmer/crop/:cropId/financial_data", RouteParams["/farmer/crop/:cropId/financial_data"]]
      | ["/farmer/crop/:cropId/:Information", RouteParams["/farmer/crop/:cropId/:Information"]]
      | ["/farmer/crops"]
      | ["/farmer/crops/year_select"]
      | ["/farmer/help"]
      | ["/farmer/help/post"]
      | ["/farmer/home"]
      | ["/"]
      | ["/logout"]
      | ["/login"]
  >(...args: T): typeof args[0];
}
