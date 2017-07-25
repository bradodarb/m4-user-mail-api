import * as dynamoDbLib from '../lib/dynamodb';
import {
    success,
    failure
} from '../lib/response-utils';

export async function main(event, context, callback) {
    const params = {
        TableName: 'userMail',
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            companyId: event.pathParameters.companyId,
            messageId: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDbLib.call('get', params);
        if (result.Item) {
            // Return the retrieved item
            callback(null, success(result.Item));
        } else {
            callback(null, failure({
                status: false,
                error: 'Item not found.'
            }));
        }
    } catch (e) {
        callback(null, failure({
            status: false,
            error: e
        }));
    }
};