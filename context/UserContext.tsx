"use client"
import React, { Dispatch, SetStateAction } from 'react';
import { useState, useEffect, createContext } from 'react';
import {  } from 'react';

interface UserContextProps {
    children: React.ReactNode
}

export interface UserProps {
    displayName: string,
    email: string,
    phoneNumber: number | null,
    photoURL: string,
    providerId: string,
    uid: string
}

interface ContextProps {
    user: UserProps,
    setUser: (user?: UserProps) => void
}

export const UserContext = createContext<Partial<ContextProps>>({ });

const UserContextProvider = ( { children }: UserContextProps ) => {
    const [user, setUser] = useState<UserProps>();

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
