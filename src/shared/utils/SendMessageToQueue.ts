import { SendMessageResult } from 'aws-sdk/clients/sqs';

import { account, SQS } from '@config/aws';

interface Payload<T> {
  queue: string;
  payload: T;
}

class SendMessageToQueue {
  async execute<T>({ queue, payload }: Payload<T>): Promise<SendMessageResult> {
    const { Account } = await account.promise();
    const queueUrl = `https://sqs.us-east-1.amazonaws.com/${Account}/${queue}`;

    const params = {
      MessageBody: JSON.stringify(payload),
      QueueUrl: queueUrl,
    };

    return SQS.sendMessage(params).promise();
  }
}

export default new SendMessageToQueue();
