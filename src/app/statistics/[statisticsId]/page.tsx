import React, { useState } from 'react';
import {  redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { getServerUser } from '@/lib/payload-utils';
import App from 'next/app';
import Statistics from './game-statistics';
import { getPayloadClient } from "../../../getPayload"

type UrlProps = {
    params: {
        statisticsId: string;
    };
};

const Page = async ({ params }: UrlProps) => {
    const payload = await getPayloadClient()
    const cookie = cookies()
    const { user } = await getServerUser(cookie)
    const { statisticsId } = params;
    const { docs: userProduct } = await payload.find({
                    collection: 'products',
                    where: {
                        id: {
                            in: statisticsId
                        },
                    },
    });
    
  //console.log("userProduct", userProduct) 
    const { docs: ordersProduct } = await payload.find({
      collection: 'orders',
      where: {
              'products.id' : {in : [statisticsId]}, 
      },
  });
  //console.log("ordersProduct", ordersProduct)
  if (!user) {
        const currentUrl = `/library`;
        redirect(`/sign-in?returnUrl=${encodeURIComponent(currentUrl)}`);
    }
    return (
      <Statistics id_user={user.id} statisticsId={statisticsId} searchParams={{}} userProduct={userProduct} ordersProduct={ordersProduct} />
    )
}

export default Page;
