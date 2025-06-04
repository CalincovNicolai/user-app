'use client';

import Image from 'next/image';
import { IUserHeaderModel } from '@/utils/types';

export default function UserHeader({ user }: IUserHeaderModel) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <Image
        className="w-16 h-16 rounded-full object-cover"
        src={user.picture.thumbnail}
        alt={`${user.name.first} ${user.name.last}`}
        width={64}
        height={64}
        priority
        unoptimized
      />
      <h2 className="text-2xl font-bold">
        {user.name.first} {user.name.last}
      </h2>
    </div>
  );
}
