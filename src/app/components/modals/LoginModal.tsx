'use client'
import useLoginModal from '@/src/app/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/src/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';

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

         console.log("Email: ", email);
         console.log("Password: ", password);

        //ADD Log IN
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        loginModal.onClose();
        
       }catch(error){
        console.log(error)
       }finally {
        setIsLoading(false)
       }
    }, [loginModal, email, password])

    const BodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder='Password'
                type='password'
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