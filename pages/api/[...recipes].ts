import httpProxyMiddleware from "next-http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessTokenResp = await getAccessToken(req, res, {});
  return httpProxyMiddleware(req, res, {
    target: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${accessTokenResp.accessToken}`,
    },
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

export default withApiAuthRequired(handler);
