import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser(session: Object[]) {
    const response = await axios(`${apiUrl}/api/users/email/${session.user.email}`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    });
    return response.data;
}

export async function fetchCompanies(session: Object[], companies: Object[]) {
    const companiesInfoPromises = companies.map(async (company) => {
        const response = await axios(`${apiUrl}/api/companies/${company.companyId}`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        return response.data;
    });

    const companiesInfo = await Promise.all(companiesInfoPromises);
    return companiesInfo;
}

export async function fetchCompany(accessToken: string, companyId: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
    }

    const response = await axios(`${apiUrl}/api/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error; // Re-throw the error after logging it
  }
}

export async function fetchOffers() {
    const session = await getServerSession(authOptions)
    const url = `${apiUrl}/api/offers/all`
    const response = await axios(url, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data)
    return response;
}

export async function fetchOffer(offerId: string) {
    const session = await getServerSession(authOptions)
    const url = `${apiUrl}/api/offers/${offerId}`
    const response = await axios(url, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    }).then(res => res.data)
    return response;
}