import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Offer } from "../model/offer";
import DbService from "../Db/DbService";
import { Application } from "../model/application";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const application = req.body as Application;
  const responseMessage = await DbService.addApplication(application);

  context.res = {
    status: 201 /* Defaults to 200 */,
    body: responseMessage
  };
};

export default httpTrigger;
