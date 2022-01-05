import httpProxyMiddleware from "next-http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    // TODO: return 401 or 403
  }

  const secret = process.env.NEXTAUTH_SECRET!;
  const jwt = await getToken({ req, secret });

  // if (session) {
  //   res.send([{ id: 42, name: "fake api result" }]);
  // }

  return httpProxyMiddleware(req, res, {
    target: process.env.API_URL,
    headers: {
      Authorization: `Bearer ${jwt}`,
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

export default handler;
