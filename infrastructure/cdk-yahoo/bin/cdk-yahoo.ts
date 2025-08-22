#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { YahooPostQueueStack } from '../lib/sqs-stack';
import { YahooPostLambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
// Khởi tạo stack SQS
const yahooPostQueueStack = new YahooPostQueueStack(app, 'YahooPostQueueStack');

// Khởi tạo stack Lambda, truyền queue từ stack SQS
new YahooPostLambdaStack(app, 'YahooPostLambdaStack', yahooPostQueueStack.yahooPostQueue);

