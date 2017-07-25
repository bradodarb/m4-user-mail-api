import uuid from 'uuid';
import * as dynamoDbLib from '../lib/dynamodb';
import {
    success,
    failure
} from '../lib/response-utils';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'userMail',
        Item: {
            companyId: event.requestContext.identity.attributes.companyId,
            userId: event.requestContext.identity.cognitoIdentityId,
            messageId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: new Date().getTime(),
        },
    };

    try {
        const result = await dynamoDbLib.call('put', params);
        callback(null, success(params.Item, 201));
    } catch (e) {
        callback(null, failure({
            status: false,
            error: e
        }));
    }
};