/**
 * We're using a separate API route from the [...recipes] catch all because
 * viewing a Recipe doesn't require being authenticated.
 */
import httpProxyMiddleware from "next-http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return httpProxyMiddleware(req, res, {
    target: process.env.API_URL,
    pathRewrite: [
      {
        // @ts-ignore
        patternStr: /^\/api\/recipes\/(.*)/,
        // @ts-ignore
        replaceStr: /\/recipes\/$1/,
      },
    ],
  });
}
