import React from 'react'
import { IconType } from 'react-icons'

export default function SidebarItem({
    href,
    label,
    icon : Icon,
    onClick
} : {
    href? : string;
    label : string;
    icon : IconType;
    onClick? : () => void
}) {
  return (
    <div className='flex flex-row items-center'>
        <div
            className='
             relative
             rounded-full
             h-14
             w-14
             flex
             items-center
             justify-center
             p-4
             hover:bg-slate-300
             hover:bg-opacity-10
             cursor-pointer
             lg:hidden
            '
        >
            <Icon size={28} color='white' />
        </div>
        <div className='
            relative
            hidden
            lg:flex
            items-center
            gap-4
            p-4
            rounded-full
            hover:bg-slate-300
            hover:bg-opacity-30
            cursor-pointer
        '>
            <Icon size={24} color='white'/>
            <p className='
                 lg:black text-white text-xl
            '>
                {label}
            </p>
        </div>
    </div>
  )
}
