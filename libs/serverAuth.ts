import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "next-auth";
import { authOptions } from "@/auth"; // make sure this exports your NextAuth config

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req);

  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  return session;
};

export default serverAuth;
