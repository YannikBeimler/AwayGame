import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import DbService from "../Db/DbService";
import { Address } from "../model/address";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const userId = context.bindingData.userId;
  const body = req.body;
  const address = body as Address;

  if (address.id === -1) {
    //insert new entry
    await DbService.addAddress(userId, address);
  } else {
    // update existing address
    await DbService.updateAddress(address);
  }

  context.res = {
    status: 201 /* Defaults to 200 */,
    body: []
  };
};

export default httpTrigger;
