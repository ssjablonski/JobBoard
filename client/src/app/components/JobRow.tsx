'use client'
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { fetchUser } from "@/utils/api";
import { deleteOffer } from "@/actions/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";


function JobRow({offer}): React.ReactElement {
    const { data: session, status } = useSession();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (session) {
        const getUser = async () => {
            const userData = await fetchUser(session);
            setUser(userData);

        };
        getUser();
        }
    }, [session]);

    const isOwner = user?.companies?.some((c) => c.companyId === offer.companyId);
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm relative">
            <div className="absolute cursor-pointer top-4 right-4">
                <FontAwesomeIcon className="size-4 text-gray-300" icon={faHeart} />
            </div>
            <div className="flex grow gap-4">
                <div className="content-center">
                    <img className="size-12" src={offer.jobIcon} alt="Job Icon" />
                </div>
                <div className="grow sm:flex">
                    <div className="grow">
                        <div className="text-gray-500 text-sm">{offer.company}</div>
                        <div className="font-bold mb-1 text-lg">
                            <Link className="hover:underline" href={`/offers/${offer.id}`}>{offer.title}</Link>
                        </div>
                        <div className="text-gray-400 text-sm">
                            {offer.mode}
                            {' '}&middot;{' '}
                            {offer.location}
                            {' '}&middot;{' '}
                            {offer.employmentType}
                            {isOwner && (
                                <>
                                {' '}&middot;{' '}
                                <button className="text-blue-600">Edit</button>
                                {' '}&middot;{' '}
                                <button onClick={() => deleteOffer(offer.id)} className="text-red-600">Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="content-end text-gray-500 text-sm">2 weeks ago</div>
                    
                </div>
            
            </div>
        </div>
    )
}

export default JobRow;