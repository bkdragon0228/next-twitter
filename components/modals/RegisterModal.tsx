import axios from 'axios'
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name ,setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [isloading, setIsLoading] = useState<boolean>(false)

    const onToggle = useCallback(() => {
        if(isloading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isloading, registerModal, loginModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            })

            toast.success('Accout created.')

            signIn('credentials', {
                email,
                password
            })

            registerModal.onClose()
        } catch(error) {
            console.log(error)
            toast.error('someting went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [registerModal, email, password, username, name])

    const bodyContent = (

        <div className='
          flex
          flex-col
          gap-4
        '>
            <Input
              placeholder='Email'
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              disabled={isloading}
            />
            <Input
              placeholder='Name'
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              disabled={isloading}
            />
            <Input
              placeholder='Username'
              onChange={(e) => setUsername(e.currentTarget.value)}
              value={username}
              disabled={isloading}
            />
            <Input
              placeholder='Password'
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              disabled={isloading}
            />
        </div>
    )

    const footerContent = (

        <div className='text-neutral-400 text-center mt-4'>
            <p>
                Already have an account?
                <span
                onClick={onToggle}
                className='
                  text-white
                  cursor-pointer
                  hover:underline
                '>
                    Sign in
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isloading}
            isOpen={registerModal.isOpen}
            title='Create an accout'
            actionLabel='Register'
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;