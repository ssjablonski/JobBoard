import JobRow from "./JobRow";

async function Jobs({offers}: {offers: Object[]}): React.ReactElement {

    const capitalizeFirstLetter = (str: string) => {
        const words = str.split('_');
        return words
            .map(word => word.toLowerCase())
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter
            .join(' ');
    };  

    // Ujednolicenie propsów
    const normalizedOffers = offers.map((offer) => ({
        id: offer.id,
        companyId: offer.companyId,
        company: capitalizeFirstLetter(offer.company?.name),
        title: capitalizeFirstLetter(offer.title),
        location: capitalizeFirstLetter(offer.location),
        employmentType: capitalizeFirstLetter(offer.employmentType),
        mode: capitalizeFirstLetter(offer.mode),
        jobIcon: offer.jobIcon,

    }));

    return (
        <div className="bg-slate-200 py-6 rounded-3xl w-full">
            <div className="container">
                <h2 className="font-bold mb-4">Recent jobs</h2>
                <div className="flex flex-col gap-4">
                    {normalizedOffers? normalizedOffers.map((offer, i) => (
                      <JobRow key={i} offer={offer}/>
                    )) : null}
                </div>
                
            </div>
        </div>
    )
}

export default Jobs;