import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Login from "@/app/components/Login";
import { getServerSession } from "next-auth";
import { redirect, useParams } from "next/navigation";

const signinErrors: Record<string | "default", string> = {
// ...
}

interface SignInPageProp {
  params: object
  searchParams: {
    callbackUrl: string
    error: string
  }
}

export default async function Signin({ searchParams: { callbackUrl, error } }: SignInPageProp) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(callbackUrl || "/")
  }
  return (
    <div className="container flex flex-col items-center mt-12 p-4 rounded-lg bg-gray-100">
        <h1 className="font-bold text-xl">You&apos;re not authenticated to visit this website.</h1>
        <h2 className="py-2 text-lg">Click button below to login:</h2>
      {error && <div>
        {signinErrors[error.toLowerCase()]}
      </div>}
      <Login />
    </div>
  )
}