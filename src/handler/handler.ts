import { configure } from "@codegenie/serverless-express";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { app } from "../app.js";

const handler = configure({ app });

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

    return result; // important!
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
