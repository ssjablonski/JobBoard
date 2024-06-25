import Link from "next/link";
import Login from "./Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "./Logout";

async function Header(): React.ReactElement {
  const session = await getServerSession(authOptions)
  // console.log("session",session)
  return (
    <header>
        <div className="container flex items-center justify-between mx-auto my-4">
        <Link href="/" className="font-bold text-xl">Job Board</Link>
        {/* {session ? <p>Hi {JSON.stringify(session)}</p> : null} */}
        <nav className="flex gap-2 *:py-2 *:px-2 *:rounded-md">
          {!session ? ( 
            <Login />
          ): <Logout />}

            <Link className="bg-blue-600 text-white" href="/new-listing">Post a job</Link>
        </nav>
        </div>
    </header>
  );
}

export default Header;