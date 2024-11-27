import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default function AdminLayout({
     children,
}: {
     children: React.ReactNode
}) {
     return (
          <div className="flex h-screen bg-gray-100">
               <Sidebar className='max-md:hidden w-52 lg:w-64 border-r'/>
               <div className="flex flex-col flex-1 overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                         <div className="container mx-auto px-4 sm:px-6 py-8">
                              {children}
                         </div>
                    </main>
               </div>
          </div>
     )
}

