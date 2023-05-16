import React , { useCallback, useEffect, useState }from 'react';
import { toast } from 'react-hot-toast'

import useCurrentUser from '@/hooks/useCurrentUset';
import useEditModal from '@/hooks/useEditModal';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import Modal from '../Modal';
import Input from '../Input';

const EditModal = () => {
    const { data : currentUser } = useCurrentUser()
    console.log('currentUser', currentUser)
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState<string>('')
    const [coverImage, setCoverImage] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [bio, setBio] = useState<string>('')

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setName(currentUser?.name)
        setUsername(currentUser?.username)
        setBio(currentUser?.bio)
    }, [currentUser?.name, currentUser?.username, currentUser?.bio, currentUser?.profileImage, currentUser?.coverImage])

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)

            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage
            })
            mutateFetchedUser()

            toast.success('Updated')

            editModal.onClose()
        }  catch (error) {
            console.log(error)
            toast.error('Someting went wrong')
        } finally {
            setIsLoading(false)
        }
    }, [name, username, bio, profileImage, coverImage, editModal, mutateFetchedUser])

    const bodyContent = (
        <div>
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
                placeholder='Bio'
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )
    return (
       <Modal
        disabled={isLoading}
        isOpen={editModal.isOpen}
        title='Edit your profile'
        actionLabel='Save'
        onClose={editModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
       />
    );
};

export default EditModal;