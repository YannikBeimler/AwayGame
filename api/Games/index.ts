import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import DbService from "../Db/DbService"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    context.res = {
        body: await DbService.getGames()
    };

};

export default httpTrigger;