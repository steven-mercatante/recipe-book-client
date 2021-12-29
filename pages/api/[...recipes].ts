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
        patternStr: /^\/api\/recipes\/(.*)/,
        replaceStr: /\/recipes\/$1/,
      },
      {
        patternStr: /^\/api\/recipes/,
        replaceStr: /\/recipes\//,
      },
    ],
  });
}

export default withApiAuthRequired(handler);
