import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
     return (
          <div className='-mt-16 h-screen w-full flex justify-center items-center'>
               <Loader className='animate-spin h-8 w-8' />
          </div>
     )
}

export default Loading