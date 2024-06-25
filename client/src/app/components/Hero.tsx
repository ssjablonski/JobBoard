import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Login from "./Login";

async function Hero(): React.ReactElement {
    const session = await getServerSession()

    return (
        <section className="container my-16 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold">Find your next dream job</h1>
            {session ? (
                <div className="mt-4">
                    {/* <h2 className="text-2xl">Welcome back {session.user.name}!</h2> */}
                    <h2 className="text-2xl">Dive back for new job offers!</h2>
                    <button className="mt-4 py-2 px-4 rounded-md bg-blue-600 text-white">
                        <Link href="/offers">Offers</Link>
                    </button>
                </div>
            ) : (
                <div className="mt-4">
                    <h2 className="text-2xl mb-6">All you have to do is log in and start exploring our offers!</h2>
                    <Login />
                </div>
            )}
        </section>
    );
}

export default Hero;