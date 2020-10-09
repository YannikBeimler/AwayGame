import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const offerId = context.bindingData.offerId;
  const responseMessage = `You got the application by user with the id ${offerId}`;

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage
  };
};

export default httpTrigger;
