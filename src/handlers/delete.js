import * as dynamoDbLib from '../lib/dynamodb';
import {
    success,
    failure
} from '../lib/response-utils';

export async function main(event, context, callback) {
    const params = {
        TableName: 'userMail',
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'companyId': Identity Pool identity id of the authenticated user
        // - 'id': path parameter
        Key: {
            companyId: event.pathParameters.companyId,
            messageId: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDbLib.call('delete', params);
        callback(null, success({
            status: true
        }));
    } catch (e) {
        callback(null, failure({
            status: false,
            error: e
        }));
    }
};