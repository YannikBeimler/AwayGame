import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Offer } from "../model/offer";
import DbService from "../Db/DbService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const offer: Offer = req.body as Offer;
  const responseMessage = `gameId: ${offer.gameId}\nuserId: ${offer.userId}\naddressId: ${offer.addressId}`;

  //const response = DbService

  context.res = {
    status: 201 /* Defaults to 200 */,
    body: responseMessage
  };
};

export default httpTrigger;
