import * as dynamoDbLib from '../lib/dynamodb';
import {
    success,
    failure
} from '../lib/response-utils';

export async function main(event, context, callback) {
    const params = {
        TableName: 'userMail',
        // 'KeyConditionExpression' defines the condition for the query
        // - 'companyId = :companyId': only return items with matching 'companyId' partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':companyId': defines 'companyId' to be Identity Pool identity id of the authenticated user
        KeyConditionExpression: "companyId = :companyId",
        ExpressionAttributeValues: {
            ":companyId": event.pathParameters.companyId
        }
    };

    try {
        const result = await dynamoDbLib.call('query', params);
        // Return the matching list of items in response body
        callback(null, success(result.Items));
    } catch (e) {
        callback(null, failure({
            status: false,
            error: e
        }));
    }
};