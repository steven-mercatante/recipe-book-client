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
      {
        // @ts-ignore
        patternStr: /^\/api\/recipes/,
        // @ts-ignore
        replaceStr: /\/recipes\//,
      },
    ],
  });
}
