import { X } from 'lucide-react'
import React from 'react'
import Sidebar from './sidebar'

type Props = {
     isOpen: boolean
     onClose: () => void
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
     return (
          <div className={`fixed top-0 left-0 z-50 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
               <div >
                    <button
                         className="absolute top-4 right-4"
                         onClick={onClose}
                         aria-label="Close menu"
                    >
                         <X size={24} />
                    </button>
                    <Sidebar className='flex'/>
               </div>
          </div>
     )
}

export default MobileMenu