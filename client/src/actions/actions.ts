'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export async function createCompany(formData: FormData) {
    const session = await getServerSession(authOptions);
    const response = await axios.post(`${process.env.API_URL}/api/companies/create`, {
        name: formData.get('name') as string, userId: formData.get('userId') as string
    }, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data);
    revalidatePath('/new-listing')
}