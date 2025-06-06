'use client'
import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useCallback, useState } from 'react'
import { signIn } from "next-auth/react"

import useLoginModal from '@/src/app/hooks/useLoginModal';
import useRegisterModal from '@/src/app/hooks/useRegisterModal'

import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading) return;

        registerModal.onClose();
        loginModal.onOpen()
    },[isLoading, registerModal, loginModal])

const handleSubmit = useCallback(async () => {
  try {
    setIsLoading(true);

    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Username: ", username);
    console.log("Name: ", name);

    await axios.post('/api/register', {
      email,
      password,
      username,
      name
    });

    toast.success("Account created.");

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      toast.error("Invalid login credentials");
    } else {
      registerModal.onClose();
    }

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
  }
}, [registerModal, email, password, username, name]);


    const BodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
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
            <p>Already have an account?
                <span
                    onClick={onToggle}
                    className='
                        text-white
                        cursor-pointer
                        hover:underline
                    '
                >
                    Sign In
                </span>
            </p>
        </div>
    )

  return (
    <Modal 
        disabled={isLoading}
        actionLabel='Create an account'
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit}
        body={BodyContent}
        footer={FooterContent}
    />
  )
}

export default RegisterModal