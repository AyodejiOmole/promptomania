"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { auth, provider } from "@firebase";
import { UserContext } from '@context/UserContext';
import { UserProps } from '@context/UserContext';

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState<Boolean>(false);
  // const isLoggedIn = true;
  const { user, setUser } = useContext(UserContext);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;

        // The signed-in user info.
        const user = result.user;
        if(typeof setUser !== undefined) {
          setUser!(user.providerData[0] as UserProps);
        }
        console.log(user.providerData[0]);
      }).catch((error) => {

        // Errors handled here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg" 
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className='logo_text'>Promptomania</p>
      </Link>

      {/* Navigation */}
      <div className="sm:flex hidden">
        {user ? (
          <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className="black_btn">
                Create post 
              </Link>

              <button 
                type="button" 
                onClick={() => {}} 
                className="outline_btn"
              >
                Sign out
              </button>

              {/* <Link href="/profile">
                <Image 
                  src={user.profileUrl}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile Image"/>
              </Link> */}
          </div>
        ): (
          <>
            <button 
                type="button"
                onClick={() => signIn()}
                className='black_btn'
                >
                Sign in
              </button>
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {user ? (
          <div className="flex">
                <Image 
                  src="/assets/icons/menu.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile Image"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(prev =>!prev)}>
                        My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={() => setToggleDropdown(prev =>!prev)}>
                        Create Prompt
                    </Link>
                    <button 
                      type="button"
                      onClick={() => {}}
                      className="mt-5 w-full black_btn">
                      Sign Out
                    </button>
                  </div>
                )}
          </div>
        ) : (
          <div className=''>
            <>
              <button 
                type="button"
                onClick={() => signIn()}
                className='black_btn'
                >
                Sign in
              </button>
            </>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
