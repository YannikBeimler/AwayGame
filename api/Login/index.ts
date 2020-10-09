import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import DbService from "../Db/DbService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const userName = context.bindingData.userName;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: await DbService.getUserIdByName(userName)
  };
};

export default httpTrigger;
