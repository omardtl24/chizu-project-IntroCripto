import React, { useState } from 'react';
import {  redirect } from "next/navigation";
import { cookies } from 'next/headers';
import { getServerUser } from '@/lib/payload-utils';
import App from 'next/app';
import { MainComponentLibrary } from './MainComponent';

const Page = async () => {
    const cookie = cookies()
    const { user } = await getServerUser(cookie)
    if (!user) {
        const currentUrl = `/library`;
        redirect(`/sign-in?returnUrl=${encodeURIComponent(currentUrl)}`);
    }
    return (
        <MainComponentLibrary id_user={user.id} />
    )
}

export default Page;
