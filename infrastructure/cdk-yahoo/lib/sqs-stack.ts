import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export class YahooPostQueueStack extends Stack {
  public readonly yahooPostQueue: Queue;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

      // Dead Letter Queue
      const dlq = new Queue(this, 'YahooPostDLQ', {
        retentionPeriod: cdk.Duration.days(4),
        queueName: 'yahoo-post-dlq',
      });

      this.yahooPostQueue = new Queue(this, 'YahooPostQueue', {
        visibilityTimeout: cdk.Duration.seconds(180), // 3 minutes
        retentionPeriod: cdk.Duration.days(4),
        maxMessageSizeBytes: 262144, // 256 KB
        receiveMessageWaitTime: cdk.Duration.seconds(20),
        deadLetterQueue: {
          maxReceiveCount: 5,
          queue: dlq,
        },
        queueName: 'yahoo-post-queue',
      });
  }
}


// Example Queue: 
// {
//   "yahooPostId": "65c0a96d-6039-4224-9d20-bcf1e9d22d44",
//   "yahooPostPlaceId": "66a0b45e-b889-49b3-9bd2-658bcd40766f",
//   "placeSeq": 295271,
//   "yahooPostDetail": {
//     "title": "コンバージョンミエルカ",
//     "feedType": "NOTICE",
//     "description": "Webサイトに訪問するユーザーの情報を解析",
//     "startDateTime": "2025-05-23T19:48:27",
//     "mediaUrl": "",
//     "isPinned": false
//   }
// }