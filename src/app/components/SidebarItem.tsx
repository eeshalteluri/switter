'use client'
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label, 
    href, 
    icon: Icon, 
    onClick}) => {

        const router = useRouter();
        const handleClick = useCallback(() => {
            if(onClick){
                return onClick();
            }

            if(href){
                router.push(href);
            }
        }, [router, onClick, href]);

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
        <div
            className='
            rounded-full
            h-14w-14
            flex
            items-center
            justify-center
            p-4
            hover:bg-slate-300
            hover:bg-opacity-10
            cursor-pointer
            transition
            lg:hidden       
            '
        >
            <Icon size={28} color="white"/>
        </div>

        <div
            className='
                hidden
                lg:flex
                items-center
                gap-4
                p-4
                rounded-fullhover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer
            '
        >
            <Icon size={24} color="white" />
            <p className='text-white text-xl hidden lg:block'>
                {label}
            </p>
        </div>
    </div>
  )
}

export default SidebarItem