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
      PIPEDRIVE_TOKEN: '3d2eaea4c8a8e1df5231176220f7b899e446c1f0',
      BLING_TOKEN:
        '0b47417f6dd816521e73d28cabc89015a57c11cb0b698329bbd082f3848e15a3c68dbf6a',
    },
  },
  functions: {
    app: {
      tags: {
        function: 'crm-integration-app',
      },
      role: 'LambdaRole',
      name: 'crm-integration-app',
      handler: 'src/server.handler',
      events: [
        {
          http: {
            method: 'POST',
            path: '/integration/charge',
            cors: true,
          },
        },
        {
          http: {
            method: 'GET',
            path: '/orders',
            cors: true,
            request: {
              parameters: {
                querystrings: {
                  page: true,
                },
              },
            },
          },
        },
      ],
    },
    process: {
      tags: {
        function: 'crm-integration-process',
      },
      role: 'LambdaRole',
      timeout: 300,
      name: 'crm-integration-process',
      handler: 'src/integration.process',
      events: [
        {
          sqs: {
            arn: {
              'Fn::GetAtt': ['CRMIntegrationProcessQueue', 'Arn'],
            },
          },
        },
      ],
    },
    charge: {
      tags: {
        function: 'crm-integration-charge',
      },
      role: 'LambdaRole',
      timeout: 300,
      name: 'crm-integration-charge',
      handler: 'src/integration.charge',
      events: [
        {
          sqs: {
            arn: {
              'Fn::GetAtt': ['CRMIntegrationChargeProcessQueue', 'Arn'],
            },
          },
        },
      ],
    },
    scheduler: {
      tags: {
        function: 'crm-integration-scheduler',
      },
      role: 'LambdaRole',
      name: 'crm-integration-scheduler',
      handler: 'src/integration.scheduler',
      events: [
        {
          schedule: {
            rate: 'rate(2 minutes)',
            enabled: false,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      CRMIntegrationProcessQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'CRMIntegrationProcessQueue',
          VisibilityTimeout: 900,
        },
      },
      CRMIntegrationChargeProcessQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'CRMIntegrationChargeProcessQueue',
          VisibilityTimeout: 900,
        },
      },
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
                      'sqs:sendMessage',
                      'sqs:deleteMessage',
                      'sqs:getQueueAttributes',
                      'sqs:receiveMessage',
                    ],
                    Resource:
                      'arn:aws:sqs:us-east-1:*:CRMIntegrationProcessQueue',
                  },
                  {
                    Effect: 'Allow',
                    Action: [
                      'sqs:sendMessage',
                      'sqs:deleteMessage',
                      'sqs:getQueueAttributes',
                      'sqs:receiveMessage',
                    ],
                    Resource:
                      'arn:aws:sqs:us-east-1:*:CRMIntegrationChargeProcessQueue',
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
