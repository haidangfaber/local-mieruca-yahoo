import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export class YahooPostQueueStack extends Stack {
  public readonly yahooPostQueue: Queue;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.yahooPostQueue = new Queue(this, 'YahooPostQueue', {
      visibilityTimeout: cdk.Duration.seconds(30),
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
//     "description": "Webサイトに訪問するユーザーの情報を解析し、そのユーザーに適したコンテンツを提供することでサイト内の回遊率アップやコンバージョン率アップを促進します。サイト分析や制作の知識が無い方でも、管理画面からノーコードで簡単にポップアップやバナー表示によりWeb接客施策を実行可能です。\n 業種・利用用途に特化したテンプレートが100種以上あるので、初めての方でもパーソナライズ施策で簡単に効果を出すことができます。",
//     "startDateTime": "2025-05-23T19:48:27",
//     "mediaUrl": "",
//     "isPinned": false
//   }
// }