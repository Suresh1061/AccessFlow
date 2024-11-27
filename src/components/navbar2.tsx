'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

import React from 'react'
import { logout } from '@/app/lib'

const Navbar2 = () => {
     const router = useRouter()

     const handleLogout = async () => {
          await logout();
          router.push('/login')
     }

     return (
          <nav className=" h-16 bg-white shadow px-4 sm:px-6">
               <div className="h-full max-w-screen-xl mx-auto flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                         AccessFlow
                    </Link>
                    <div className="space-x-5">
                         <Button
                              variant={"outline"}
                              asChild
                         >
                              <Link href="/status">Status</Link>
                         </Button>
                         <Button onClick={handleLogout}>
                              Logout
                         </Button>
                    </div>
               </div>
          </nav>
     )
}

export default Navbar2
