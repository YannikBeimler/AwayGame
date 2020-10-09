import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Offer } from "../model/offer";
import DbService from "../Db/DbService";
import { Application } from "../model/application";
import { Address } from "../model/address";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const userId = context.bindingData.userId;
  const address = req.body as Address;
  const responseMessage = await DbService.addAddress(userId, address);

  context.res = {
    status: 201 /* Defaults to 200 */,
    body: responseMessage
  };
};

export default httpTrigger;
