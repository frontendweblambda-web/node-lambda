import { configure } from "@codegenie/serverless-express";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { app } from "../app.js";

const handler = configure({
  app,
  resolutionMode: "PROMISE",
  respondWithErrors: true,
  logSettings: { level: "info" },
  //   framework: {
  //     sendRequest: (handler: { request: any; response: any }) => {
  //       console.log("Framework sendRequest called");
  //       // Custom logic to handle the request and response
  //       // For example, you can directly call the Express app here
  //       //   app(handler.request, handler.response);
  //     },
  //   },
});

export const server = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    const result = await handler(event, context, (error, result) => {
      if (error) {
        return Promise.reject(error);
      }
      return result;
    });

    console.log("Lambda invoked with event:", JSON.stringify(event));
    console.log("Lambda context:", JSON.stringify(context));
    console.log("Handler result:", JSON.stringify(result));

    return result; // important!
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
