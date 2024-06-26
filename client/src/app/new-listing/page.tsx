
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import Link from "next/link";
import { fetchCompanies, fetchUser } from "@/utils/api";
import { createCompany } from "@/actions/actions";


export default async function NewListingPage() {
    const session = await getServerSession(authOptions);

    const user = await fetchUser(session);
    const companies = await fetchCompanies(session, user.companies);

    return (
        <div className="container">
            <h2 className="text-lg mt-6 font-semibold">Your companies</h2>
            <p className="text-gray-500 ">Select a company to create a job add for</p>
            {companies.length > 0 ? companies.map((company, i) => (
                <div key={i} className="border border-blue-200 bg-blue-100 rounded-md p-4 mb-2">
                    <Link href={`/new-listing/addOffer/${company.id}`}>
                        {company.name}
                    </Link>
                </div>
            )) : <div className="border border-blue-200 bg-blue-100 rounded-md p-4">
                No companies assigned to your account
            </div>}
            
            <h2 className="text-lg mt-6 font-semibold">Create a new company</h2>
            <p className="text-gray-500 ">To create a job listing you first need to register a company</p>
            <form className="flex gap-2" action={createCompany}>
                <input type="text" name="name" className="p-2 border border-gray-400 rounded-md" placeholder="Company name"/>
                <input type="hidden" name="userId" value={user.id} />
                <button type="submit" className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md">
                    Create company 
                </button>
            </form>
        </div>
    )
}

