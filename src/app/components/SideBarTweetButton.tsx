'use client'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { FaFeather } from 'react-icons/fa6'
import LoginModal from './modals/LoginModal'
import useLoginModal from '../hooks/useLoginModal'

const SideBarTweetButton = () => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const onClick = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal])
    return (
    <div
        onClick={onClick}
    >
        {/*Mobile first*/}
        <div className='
            mt-6
            lg:hidden
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
          bg-sky-500
            hover:bg-opacity-50
            cursor-pointer
            transition
        '>
            <FaFeather size={24} color="white" />
        </div>
        
        {/*Desktop first*/}
        <div className='
            mt-6
            hidden
            lg:block
            rounded-full
            px-4
            py-2
          bg-sky-500
            hover:bg-opacity-50
            cursor-pointer
            transition
            text-center
            text-white
        '>
            <p>
                Tweet
            </p>
        </div>
    </div>
  )
}

export default SideBarTweetButton