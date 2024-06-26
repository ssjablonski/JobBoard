import { create } from 'domain';
'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function createCompany(formData: FormData) {
    const session = await getServerSession(authOptions);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/create`, {
        name: formData.get('name') as string, userId: formData.get('userId') as string
    }, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data);
    revalidatePath('/new-listing')
}

export async function createOffer(formData: FormData) {
    const session = await getServerSession(authOptions);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/offers/create`, {
        companyId: formData.get('companyId') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        salary: formData.get('salary') as string,
        employmentType: formData.get('employmentType') as string,
        mode: formData.get('mode') as string,
        jobIcon: formData.get('jobIcon') as string,
        contactPhoto: formData.get('contactPhoto') as string,
        contactName: formData.get('contactName') as string,
        contactPhone: formData.get('contactPhone') as string,
        contactEmail: formData.get('contactEmail') as string,
    }, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data);
    revalidatePath('/new-listing')
}

export async function deleteOffer(offerId: string) {
    const session = await getServerSession(authOptions);
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/offers/${offerId}/delete`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data);
    revalidatePath('/offers')
}