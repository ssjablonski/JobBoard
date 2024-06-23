import Link from "next/link";

function Hero(): React.ReactElement {
    return (
        <section className="container my-16">
            <h1 className="text-4xl font-bold text-center">Find your next dream job</h1>
            <h2 className="text-center text-2xl">All you have to is Login and start exploring our offers!</h2>
            <h2 className="text-center text-2xl">If you&apos;re already logged in start seeking for your job!</h2>
            <button className="gap-2 py-2 px-2 rounded-md bg-blue-600 text-white">
                <Link href="/offers">Offers</Link>
            </button>
        </section>
    )
}

export default Hero;