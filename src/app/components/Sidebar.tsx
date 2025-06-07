'use client'
import React from 'react'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import SideBarLogo from './SideBarLogo'
import SidebarItem from './SidebarItem'
import { BiLogOut } from 'react-icons/bi'
import SideBarTweetButton from './SideBarTweetButton'
import useCurrentUser from '../hooks/useCurrentUser'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  const { data : currentUser } = useCurrentUser();

  const items = [
    {
        label: 'Home',
        href: '/',
        icon: BsHouseFill
    },
    {
        label: 'Notifications',
        href: '/notifications',
        icon: BsBellFill,
        auth: true,
    },
    {
        label: 'Profile',
        href: '/users/123',
        icon: FaUser,
        auth: true,
    },
  ]
    return (
    <div className='col-span-1 h-full pr-4 md?:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SideBarLogo />

          {
            items.map((item, index) => (
              <SidebarItem 
                key={index}
                href={item.href}
                label={item.label}
                icon={item.icon}
                auth={item.auth}
              />
            )
          )}

          {currentUser && 
          (<SidebarItem onClick={() => signOut()} label='Logout' icon={BiLogOut} />
          )}
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar