"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { signInWithPopup, signOut, GoogleAuthProvider, OAuthCredential, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "@utils/firebase";
import { UserContext } from '@context/UserContext';
import { UserProps } from '@context/UserContext';

const Navbar = () => {
  const [toggleDropdown, setToggleDropdown] = useState<Boolean>(false);
  const { user, setUser } = useContext(UserContext);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider).then((result) => {
        // The signed-in user info.
        const user = result.user;
        if(typeof setUser !== undefined) {
          setUser!(user.providerData[0] as UserProps);
          if(typeof window !== 'undefined') {
            window.localStorage.setItem("User", JSON.stringify(user.providerData[0]));
          }
        }
        console.log(user.providerData[0]);
      })
    } catch (error: any) {
        // Errors handled here.
        const errorMessage = error.message;
        console.log(errorMessage);
        console.error(error);
    };
  }

  const logOut = () => {
    signOut(auth).then(() => {
      setUser!();
      if(typeof window !== 'undefined') {
        window.localStorage.removeItem("User");
      }
      alert("User signed out.");
      // console.log(result);
    }).catch((error) => {
      console.log(error);
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
                onClick={() => {logOut()}} 
                className="outline_btn"
              >
                Sign out
              </button>

              <Link href="/profile">
                <Image 
                  src={user.photoURL}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile Image"/>
              </Link>
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
                      onClick={() => {logOut()}} 
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
