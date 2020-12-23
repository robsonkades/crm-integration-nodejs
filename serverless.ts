import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  configValidationMode: 'warn',
  service: {
    name: 'crm-integration',
  },
  frameworkVersion: '2',
  package: {
    excludeDevDependencies: true,
    individually: true,
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      forceExclude: ['aws-sdk'],
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    apiName: 'crm-integration',
    stackName: 'crm-integration',
    stage: 'dev',
    tags: {
      service: 'crm-integration',
    },
    timeout: 30,
    logRetentionInDays: 30,
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DEBUG: 'app:*',
    },
  },
  functions: {
    app: {
      tags: {
        function: 'crm-integration',
      },
      role: 'LambdaRole',
      name: 'crm-integration-server',
      handler: 'src/server.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: '/integration/change',
            cors: true,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      LambdaRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          RoleName: 'CRMIntegrationServiceRole',
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: {
              Effect: 'Allow',
              Principal: {
                Service: ['lambda.amazonaws.com'],
              },
              Action: 'sts:AssumeRole',
            },
          },
          Policies: [
            {
              PolicyName: 'crm-integration-service-policy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: [
                      'logs:createLogGroup',
                      'logs:createLogStream',
                      'logs:putLogEvents',
                    ],
                    Resource: 'arn:aws:logs:us-east-1:*:*:*:*',
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'dynamodb:GetItem',
                      'dynamodb:PutItem',
                      'dynamodb:Scan',
                      'dynamodb:UpdateItem',
                      'dynamodb:CreateTable',
                      'dynamodb:DescribeTable',
                      'dynamodb:DeleteItem',
                      'dynamodb:Query',
                    ],
                    Resource: 'arn:aws:dynamodb:us-east-1:*:table/Tenants',
                  },
                  {
                    Effect: 'Allow',
                    Action: ['dynamodb:Scan', 'dynamodb:Query'],
                    Resource:
                      'arn:aws:dynamodb:us-east-1:*:table/Tenants/index/*',
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'xray:PutTraceSegments',
                      'xray:PutTelemetryRecords',
                    ],
                    Resource: '*',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
