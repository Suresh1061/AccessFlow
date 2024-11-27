'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MobileMenu from './mobile-menu'

const Navbar = () => {
     const [isOpen, setIsOpen] = useState(false)
     return (
          <nav className="bg-white shadow-sm">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                         <div className="flex items-center">
                              <span className="text-2xl font-bold text-gray-800">AccessFlow Admin Panel</span>
                         </div>
                         <Button
                              variant="outline"
                              size="icon"
                              aria-label="Open menu"
                              className='md:hidden'
                              onClick={() => setIsOpen(!isOpen)}
                         >
                              <Menu className='h-6 w-6' />
                         </Button>
                         {/* Mobile Menu Section */}
                         <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
                    </div>
               </div>
          </nav>
     )
}

export default Navbar