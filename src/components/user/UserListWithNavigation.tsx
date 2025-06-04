'use client';

import { useRouter } from 'next/navigation';
import UserListContainer from './UserListContainer';
import { IUserModel } from '@/utils/types';

export default function UserListWithNavigation() {
  const router = useRouter();

  const handleUserClick = (user: IUserModel) => {
    router.push(`/user/${user.login.uuid}`);
  };

  return <UserListContainer onUserClick={handleUserClick} />;
}
