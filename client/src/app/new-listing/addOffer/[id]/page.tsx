import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AddOfferForm from '@/app/components/AddOfferForm';
import Jobs from '@/app/components/Jobs';
import { fetchCompany } from '@/utils/api';
import { getAccessToken } from '@/utils/sessionTokenAccesor';
import { get } from 'http';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';



export default async function CompanyPage({ params }: {params: {id: string}}){
  const accessToken = await getAccessToken();
  const info = await fetchCompany(accessToken, params.id);

  const normalizedOffers = info.offers.map((offer) => ({
    ...offer,
    company: { name: info.name }
  }));


  return (
    <div className='container my-12'>
      <AddOfferForm companyId={params.id}/>
    </div>
  );
};
 