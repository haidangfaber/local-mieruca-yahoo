import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Table, AttributeType, BillingMode, ProjectionType } from 'aws-cdk-lib/aws-dynamodb';

export class YahooQueueTableStack extends cdk.Stack {
    public readonly yahooQueueTable: Table;
    public readonly idemTable: Table;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);


        this.yahooQueueTable = new Table(this, 'YahooQueueTable', {
            partitionKey: { name: 'PK', type: AttributeType.STRING },
            sortKey: { name: 'SK', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'YahooQueueTable',
            timeToLiveAttribute: 'ttl',
        });

        this.yahooQueueTable.addGlobalSecondaryIndex({
            indexName: 'GSI1',
            partitionKey: { name: 'GSI1PK', type: AttributeType.STRING },
            sortKey: { name: 'GSI1SK', type: AttributeType.STRING },
            projectionType: ProjectionType.ALL,
        });

        this.idemTable = new Table(this, 'IdemTable', {
            partitionKey: { name: 'id', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'IdemTable',
        });
    }
}
