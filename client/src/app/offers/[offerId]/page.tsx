import { fetchOffer } from "@/utils/api";
import Image from "next/image";


export default async function SingleJobPage({ params}) {
    const { offerId } = params;
    const offer = await fetchOffer(offerId);

    const capitalizeFirstLetter = (str: string) => {
        const words = str.split('_');
        return words
            .map(word => word.toLowerCase())
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter
            .join(' ');
    }; 


    return (
        <div className="container mt-8 my-6">
      <div className="sm:flex">
        <div className="grow">
          <h1 className="text-4xl mb-2 font-semibold">{offer.title}</h1>
          <div className="capitalize text-sm text-blue-800 mb-4">
            {capitalizeFirstLetter(offer.mode)}
            {' '}&middot;{' '}
            {capitalizeFirstLetter(offer.location)}
            {' '}&middot;{' '}
            {capitalizeFirstLetter(offer.employmentType)}
          </div>
        </div>
        <div>
          <Image
            src={offer?.jobIcon} alt={'job icon'}
            width={500} height={500}
            className="w-auto h-auto max-w-16 max-h-16 rounded-md"
          />
        </div>
      </div>
      <div className="whitespace-pre-line text-sm text-gray-600">
        {offer.description}
      </div>
      <div className="mt-4 bg-gray-200 p-8 rounded-lg">
        <h3 className="font-bold mb-2">Apply by contacting us</h3>
        <div className="flex gap-4">
          <Image
            src={offer.contactPhoto}
            alt={'contact person'}
            width={500} height={500}
            className="w-auto h-auto max-w-24 max-h-24"
          />
          <div className="flex content-center items-center">
            {offer.contactName}<br />
            Email: {offer.contactEmail}<br />
            Phone: {offer.contactPhone}
          </div>
        </div>
      </div>
    </div>
    );
}