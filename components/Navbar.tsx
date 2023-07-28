"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);
  const [toggleDropdown, setToggleDropdown] = useState<Boolean>(false);

  useEffect(() => {
    const generateProviders = async () => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
    }

    generateProviders();
  }, []);

  const signUp = () => {
    setToggleDropdown((prev) => !prev);
    signOut();
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
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
              <Link href="/create-prompt" className="black_btn">
                Create post 
              </Link>

              <button 
                type="button" 
                onClick={() => signOut} 
                className="outline_btn"
              >
                Sign out
              </button>

              <Link href="/profile">
                <Image 
                  src="/assets/images/logo.svg"
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="Profile Image"/>
              </Link>
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider: any) => (
              <button 
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
                >
                Sign in
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
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
                      onClick={signUp}
                      className="mt-5 w-full black_btn">
                      Sign Up
                    </button>
                  </div>
                )}
          </div>
        ) : (
          <div className=''>
            <>
              {providers && Object.values(providers).map((provider: any) => (
                <button 
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                  >
                  Sign in
                </button>
              ))}
            </>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
