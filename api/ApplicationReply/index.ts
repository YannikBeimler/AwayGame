import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Offer } from "../model/offer";
import DbService from "../Db/DbService";
import { Application } from "../model/application";
import { Address } from "../model/address";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const applicationId = context.bindingData.applicationId;
  const accept = req.body;
  await DbService.replyApplication(applicationId, !!accept ? 1 : 0);

  context.res = {
    status: 204 /* Defaults to 200 */
  };
};

export default httpTrigger;
