import axios from "axios";
import JobRow from "./JobRow";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



async function fetchOffers() {
    const session = await getServerSession(authOptions)
    const url = `${process.env.API_URL}/api/offers/all`
    const response = await axios(url, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data)
    console.log(response)
    return response;
}

async function Jobs(): React.ReactElement {
    const offers = await fetchOffers();
    // console.log(off)
    return (
        <div className="bg-slate-200 py-6 rounded-3xl w-full">
            <div className="container">
                <h2 className="font-bold mb-4">Recent jobs</h2>
                <div className="flex flex-col gap-4">
                    <JobRow />
                    <JobRow />
                    <JobRow />
                    <JobRow />
                    {offers? offers.map((offer, i) => (
                       <div key={i} className="bg-white p-4 rounded-lg shadow-sm relative">
                            <h2>{offer.company.name}</h2>
                            <h2>{offer.title}</h2>
                            <p>{offer.employmentType}</p>
                       </div> 
                    )): null}
                </div>
                
            </div>
        </div>
    )
}

export default Jobs;