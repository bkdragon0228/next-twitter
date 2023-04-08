import React, {PropsWithChildren} from 'react'
import Sidebar from './layout/Sidebar'
import Followbar from './layout/Followbar'


export default function Layout(props : PropsWithChildren) {
  return (
    <div className='h-screen bg-black'>
        <div className='container h-full mx-auto xl:px-30 max-w-6xl border border-white'>
            <div className='grid grid-cols-4 h-full'>
                <Sidebar />
                <div className='
                    col-span-3
                    lg:col-span-2
                    border-x-[1px]
                    border-neutral-800
                '>
                 {props.children}
                </div>
                <Followbar />
            </div>
        </div>
    </div>
  )
}
