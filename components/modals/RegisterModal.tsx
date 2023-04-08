import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';

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

            // TODO ADD REGISTER AND lOGIN

            registerModal.onClose()
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }, [registerModal])

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