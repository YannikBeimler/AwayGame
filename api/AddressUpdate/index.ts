import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import DbService from "../Db/DbService";
import { Address } from "../model/address";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const address: Address = req.body as Address;

  let responseMessage = null

  if (address.id === -1 || address === undefined){
    //insert new entry
    responseMessage = await DbService.addAddress(address.userId, address);
  } else {
    // update existing address
    responseMessage = await DbService.updateAddress(address);
  }

console.log(req.body)
  context.res = {
    status: 200 /* Defaults to 200 */,
    body: responseMessage
  };
};

export default httpTrigger;