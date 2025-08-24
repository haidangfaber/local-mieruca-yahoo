
import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';

import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class YahooPostLambdaStack extends Stack {
  constructor(scope: Construct, id: string, queue: Queue, props?: StackProps) {
    super(scope, id, props);

    const yahooPostQueue = queue;

    const lambdaFn = new NodejsFunction(this, 'YahooPostPoller', {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../../../function/yahooPostHandler.ts'),
      handler: 'handler',
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      reservedConcurrentExecutions: 20,
    });

    lambdaFn.addEventSource(new SqsEventSource(yahooPostQueue, {
      batchSize: 5,
      enabled: true,
      maxConcurrency: 10,
    }));
  }
}



