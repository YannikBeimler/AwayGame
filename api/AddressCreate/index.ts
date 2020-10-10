import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import DbService from "../Db/DbService";
import { Address } from "../model/address";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const userId = context.bindingData.userId;
  const address = req.body as Address;

  context.res = {
    status: 201 /* Defaults to 200 */,
    body: await DbService.addAddress(userId, address)
  };
};

export default httpTrigger;
