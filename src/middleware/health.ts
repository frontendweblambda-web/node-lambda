import { getCurrentInvoke } from "@codegenie/serverless-express";
import type { NextFunction, Request, Response } from "express";
export const healthCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const invoke = getCurrentInvoke();
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`Health check requested from IP: ${ip}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Current Invoke Event: ${JSON.stringify(invoke.event)}`);
  console.log(`Current Invoke Context: ${JSON.stringify(invoke.context)}`);
  res.status(200).send({
    status: "OK",
    timestamp: new Date().toISOString(),
    ip: ip,
    message: "Service is healthy",
    version: process.env.VERSION || "unknown",
  });
};
