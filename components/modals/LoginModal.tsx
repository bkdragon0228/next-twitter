import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';
import {signIn} from 'next-auth/react'

import Input from '../Input';
import Modal from '../Modal';

const LoginModal = () => {
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isloading, setIsLoading] = useState<boolean>(false)

    const onToggle = useCallback(() => {
        if(isloading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isloading, registerModal, loginModal])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await signIn('credentials',  {
                email,
                password
            })

            loginModal.onClose()
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [loginModal, email, password])

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
              placeholder='Password'
              type='password'
              onChange={(e) => setPassword(e.currentTarget.value)}
              value={password}
              disabled={isloading}
            />
        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>
                Frist time using Twitter?
                <span
                onClick={onToggle}
                className='
                  text-white
                  cursor-pointer
                  hover:underline
                '>
                    Create an accout
                </span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isloading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Sign in'
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;