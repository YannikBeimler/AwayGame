import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import DbService from "../Db/DbService";
import { Application } from "../model/application";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const application = req.body as Application;

  context.res = {
    status: 201 /* Defaults to 200 */,
    body: await DbService.addApplication(application)
  };
};

export default httpTrigger;
