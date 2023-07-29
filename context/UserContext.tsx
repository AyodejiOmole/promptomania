"use client"
import React from 'react';
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
    user: UserProps | {} | undefined,
    setUser: (user: UserProps) => void
}

export const UserContext = createContext<Partial<ContextProps>>({ });

const UserContextProvider = ( { children }: UserContextProps ) => {
    const [user, setUser] = useState<UserProps | {} | undefined>({});

    //  const inputUser = (user: {}) => {
    //     setUser((prev) => prev = user);
    //  }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
