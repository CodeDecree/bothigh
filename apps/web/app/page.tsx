import { prisma } from "@repo/database";
import SignIn from "../components/sing-in";

export default async function IndexPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      {/* <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre> */}
      <SignIn />
    </div>
  );
}
