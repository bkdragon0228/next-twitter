import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

interface AvatarsProps {
    userId : string;
    isLarge? : boolean;
    hasBoarder ? : boolean
}

const Avatar : React.FC<AvatarsProps>= ({
    userId,
    hasBoarder,
    isLarge,
}) => {
    const router = useRouter()
    const {data : fetchedUser} = useUser(userId)

    const onClick = useCallback((event : any) => {
        event.stopPropagation();

        const url =`/user/${userId}`;

        router.push(url)
    }, [router, userId])
    return (
        <div
            className={`
                ${hasBoarder ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-32' : 'h-12'}
                ${isLarge ? 'w-32' : 'w-12'}
                rounded-full
                hover:opacity-90
                transition
                cursor-pointer
                relative
            `}
        >
            <Image
                fill
                style={{
                    objectFit : 'cover',
                    borderRadius : '100%'
                }}
                alt='Avatar'
                onClick={onClick}
                src={fetchedUser?.profiledImage || '/images/placeholder.png'}
            />
        </div>
    );
};

export default Avatar;