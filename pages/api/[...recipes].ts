import httpProxyMiddleware from "next-http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "@auth0/nextjs-auth0";

const proxyConfig = {
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
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    /**
     * Auth isn't required when viewing a recipe.
     */
    const accessTokenResp = await getAccessToken(req, res, {});
    proxyConfig.headers = {
      Authorization: `Bearer ${accessTokenResp.accessToken}`,
    };
  } catch (e) {
    // TODO: do something??
  }
  // @ts-ignore
  return httpProxyMiddleware(req, res, proxyConfig);
}

export default handler;
