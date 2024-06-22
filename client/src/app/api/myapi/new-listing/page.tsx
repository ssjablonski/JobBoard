import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const companies = [
    {
        name: 'Company 1',
        id: 1
    },
    {
        name: 'Company 2',
        id: 2
    },
    {
        name: 'Company 3',
        id: 3
    }
] 

export default async function NewListingPage() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    // TODO fetch companies and user to display
    return (
        <div className="container">
            {user? <p>{JSON.stringify(user)}</p>: null}
            {companies? companies.map((company, i) => {
                return <div key={i} className="border border-gray-200 p-4 mb-2 rounded-md">
                    <h3 className="text-lg font-semibold">{company.name}</h3>
                </div>
            }): null}
                <h2 className="text-lg mt-6 font-semibold">Your companies</h2>
                <p className="text-gray-500 ">Select a company to create a job add for</p>
                <div className="border border-blue-200 bg-blue-100 rounded-md p-4">
                    No companies assigned to your account
                    </div>


                <h2 className="text-lg mt-6 font-semibold">Create a new company</h2>
                <p className="text-gray-500 ">To create a job listing you first need to register a company</p>
            <form action="" className="flex gap-2">
                <input type="text" className="p-2 border border-gray-400 rounded-md" placeholder="Company name"/>
                <button className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md">
                    Create company 
                </button>
            </form>

        </div>
    )

}