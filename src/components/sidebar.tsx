'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, LogOut } from 'lucide-react'
import { logout } from '@/app/lib'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const menuItems = [
     { icon: Users, label: 'Users', href: '/admin-dashboard/users' },
]

const Sidebar = ({ className }: { className?: string }) => {
     const pathname = usePathname()
     const router = useRouter()

     const signOut = async () => {
          await logout();
          router.replace('/login')
     }

     return (
          <div className={`flex flex-col h-screen justify-between bg-white ${className}`}>
               <div className="flex-1 flex flex-col  pt-5 pb-4 overflow-y-auto">
                    <nav className="flex-1 px-4 lg:px-6 space-y-1">
                         <div className=' flex justify-start items-center mb-6'>
                              <div className="flex-shrink-0">
                                   <Image
                                        className="h-8 w-8 rounded-full"
                                        src="https://github.com/shadcn.png"
                                        alt="User profile"
                                        width={32}
                                        height={32}
                                   />
                              </div>
                              <div className="ml-3">
                                   <div className="text-base font-medium text-gray-800">Admin</div>
                              </div>
                         </div>
                         <div className='flex-1  space-y-1'>
                              {menuItems.map((item) => (
                                   <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${pathname === item.href
                                             ? 'bg-gray-100 text-gray-900'
                                             : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                             }`}
                                   >
                                        <item.icon
                                             className={`mr-3 flex-shrink-0 h-5 w-5 ${pathname === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'
                                                  }`}
                                             aria-hidden="true"
                                        />
                                        {item.label}
                                   </Link>
                              ))}
                         </div>
                    </nav>
               </div>
               <div className="flex-shrink-0 flex border-t p-4 lg:p-6">
                    <button
                         className="flex-shrink-0 group block w-full"
                         onClick={() => { }}
                    >
                         <div className="flex items-center" onClick={signOut}>
                              <div>
                                   <LogOut className="inline-block h-6 w-6 rounded-full text-gray-400 group-hover:text-gray-500" />
                              </div>
                              <div className="ml-3">
                                   <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Logout</p>
                              </div>
                         </div>
                    </button>
               </div>
          </div>
     )
}

export default Sidebar