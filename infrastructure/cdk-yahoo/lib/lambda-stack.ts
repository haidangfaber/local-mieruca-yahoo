import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export class YahooPostLambdaStack extends Stack {
  constructor(scope: Construct, id: string, queue: Queue, props?: StackProps) {
    super(scope, id, props);

  const yahooPostQueue = queue;

    const lambdaFn = new Function(this, 'YahooPostPoller', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Received SQS event:', JSON.stringify(event));
          // Xử lý message ở đây
          return {};
        };
      `),
      timeout: cdk.Duration.seconds(30),
    });

    lambdaFn.addEventSource(new SqsEventSource(yahooPostQueue, {
      batchSize: 5,
      enabled: true,
    }));
  }
}



