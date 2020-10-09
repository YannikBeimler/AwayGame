import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const id = context.bindingData.id;
  const responseMessage = `You got the game with the id ${id}`;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
};

export default httpTrigger;
