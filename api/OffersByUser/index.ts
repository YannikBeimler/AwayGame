import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import DbService from "../Db/DbService"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const userId = context.bindingData.userId;

    context.res = {
        body: await DbService.getOffersForUser(userId)
    };

};

export default httpTrigger;




