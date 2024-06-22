import JobRow from "./JobRow";

const offers = [
    {
        companyId: "1",
        title: "Software Engineer",
        employmentType: "Full-time"
    },
    {
        companyId: "2",
        title: "Software Engineer",
        employmentType: "Full-time"
    }]

async function Jobs(): React.ReactElement {
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
                            <h2>{offer.companyId}</h2>
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