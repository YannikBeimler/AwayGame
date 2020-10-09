import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const gameId = context.bindingData.gameId;
  const offerId = context.bindingData.offerId;
  const responseMessage = `You got the offer with the id ${offerId} from the game with the id ${gameId}`;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
};

export default httpTrigger;
