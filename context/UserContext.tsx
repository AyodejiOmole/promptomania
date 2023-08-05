"use client"
import React from 'react';
import { createContext } from 'react';
import { useLocalStorage } from '@hooks/useLocalStorage';

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
    const [user, setUser] = useLocalStorage<UserProps | any>(
        "shopping-cart",
        null
    );

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
