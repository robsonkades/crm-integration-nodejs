const swagger = `{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "Swagger CRM Integration",
    "contact": {
      "email": "robsonkades@outlook.com"
    }
  },
  "host": "http://localhost:3000/",
  "basePath": "dev",
  "tags": [
    {
      "name": "Integration",
      "description": "Apis de integração"
    }
  ],
  "schemes": [
    "https",
    "http"
  ],
  "paths": {
    "/integration/charge": {
      "post": {
        "tags": [
          "Integration"
        ],
        "summary": "Carga inicial",
        "description": "Api responsável criar uma carga inicial dos dados",
        "operationId": "integrationCharge",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Enviado requisição para fila de processamento"
          },
          "500": {
            "description": "Erro Interno do servidor",
            "schema": {
              "$ref": "#/definitions/GenericError"
            }
          }
        }
      }
    },
    "/integration/webhooks": {
      "post": {
        "tags": [
          "Integration"
        ],
        "summary": "Cria webhook de integração",
        "description": "Api responsável por criar os webhooks no provider",
        "operationId": "createWebhook",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Sucesso ao criar o webhook"
          },
          "500": {
            "description": "Erro Interno do servidor",
            "schema": {
              "$ref": "#/definitions/GenericError"
            }
          }
        }
      },
      "get": {
        "tags": [
          "Integration"
        ],
        "summary": "Lista os webhooks",
        "description": "Api responsável listar os webhooks cadastrados no provider",
        "operationId": "getWebhooks",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Sucesso ao listar os webhooks",
            "schema": {
              "$ref": "#/definitions/listWebhooksResponse"
            }
          },
          "500": {
            "description": "Erro Interno do servidor",
            "schema": {
              "$ref": "#/definitions/GenericError"
            }
          }
        }
      }
    },
    "/orders": {
      "get": {
        "tags": [
          "Integration"
        ],
        "summary": "Listar orders",
        "description": "Api responsável por buscar as orders acumuladas do dia",
        "operationId": "listOrders",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "Sucesso as orders",
            "schema": {
              "$ref": "#/definitions/ListOrdersResponse"
            }
          },
          "500": {
            "description": "Erro Interno do servidor",
            "schema": {
              "$ref": "#/definitions/GenericError"
            }
          }
        }
      }
    }
  },
  "definitions": {
    "listWebhooksResponse": {
      "type": "object",
      "properties": {
        "data": {
          "type": "array",
          "description": "Retorna a lista de webhooks",
          "required": true,
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "number",
                "description": "Id do webhook",
                "required": true
              },
              "company_id": {
                "type": "number",
                "description": "Id da empresa",
                "required": true
              },
              "event_action": {
                "type": "string",
                "description": "Nome do evento",
                "required": true
              },
              "event_object": {
                "type": "string",
                "description": "Nome da função",
                "required": true
              },
              "subscription_url": {
                "type": "string",
                "description": "URL do Webhook",
                "required": true
              }
            }
          }
        }
      }
    },
    "ListOrdersResponse": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "_id": {
            "description": "Id",
            "required": true,
            "type": "string"
          },
          "date": {
            "description": "Dia",
            "required": true,
            "format": "date-time",
            "type": "string"
          },
          "value": {
            "description": "Valor acumulado do dia",
            "required": true,
            "type": "number"
          }
        }
      }
    },
    "ErroInterno": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string",
          "required": true
        },
        "category": {
          "type": "string",
          "required": true
        }
      }
    },
    "GenericError": {
      "type": "object",
      "properties": {
        "message": {
          "type": "string",
          "required": true
        },
        "category": {
          "type": "string",
          "required": true
        }
      }
    }
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  }
}`;

export default swagger;
