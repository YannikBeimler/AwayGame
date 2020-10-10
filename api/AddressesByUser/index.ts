import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import DbService from "../Db/DbService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const userId = context.bindingData.userId;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: await DbService.getAddressesByUser(userId)
  };
};

export default httpTrigger;
