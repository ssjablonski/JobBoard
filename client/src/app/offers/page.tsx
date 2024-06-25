import { fetchOffers } from "@/utils/api";
import Jobs from "../components/Jobs";


async function OffersPage() {
  const offers = await fetchOffers();
  return (
    <div>
      <div className="container my-16">
        <h1 className="text-4xl font-bold text-center mt-4">Find your dream job!</h1>
        <form className="flex gap-2 mt-4 mx-auto max-w-md" action="">
            <input 
                type="search" 
                className="border border-gray-400 w-full py-2 px-4 rounded-md" 
                placeholder="Search phrase..."
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md">Search</button>
        </form>
      </div>
        
      <Jobs offers={offers}/>
    </div>
  );
}

export default OffersPage;