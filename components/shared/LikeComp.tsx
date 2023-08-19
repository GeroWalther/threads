'use client';
import { updateThreadLikes } from '@/lib/actions/thread.actions';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
interface LikeCompProps {
  likesCount: number;
  id: string;
  authorId: string;
}

export default function LikeComp({ likesCount, id, authorId }: LikeCompProps) {
  const path = usePathname();
  async function like() {
    await updateThreadLikes({ threadId: id, userId: authorId, path });
  }

  return (
    <>
      <Image
        src='/assets/heart-gray.svg'
        alt='heart'
        width={24}
        height={24}
        className='cursor-pointer object-contain'
        onClick={like}
      />
      <span className='text-subtle-medium text-gray-1 -ml-2 mt-1'>
        {likesCount.toString()}
      </span>
    </>
  );
}
