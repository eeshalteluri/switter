'use client'
import useLoginModal from '@/app/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
            if(isLoading) return;
    
            loginModal.onClose();
            registerModal.onOpen()
        },[isLoading, registerModal, loginModal])

    const handleSubmit = useCallback(async () => {
       try{
         setIsLoading(true);

        //ADD Log IN
        loginModal.onClose();
        
       }catch(error){
        console.log(error)
       }finally {
        setIsLoading(false)
       }
    }, [loginModal])

    const BodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const FooterContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>First time using Twitter? 
                <span
                    onClick={onToggle}
                    className='
                        text-white
                        cursor-pointer
                        hover:underline
                    '
                >
                   Create an account  
                </span>
            </p>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        actionLabel='Login'
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit}
        body={BodyContent}
        footer={FooterContent}
    />
  )
}

export default LoginModal