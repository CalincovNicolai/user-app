'use client';

import { useState } from 'react';
import UserListContainer from './UserListContainer';
import UserModal from './modals/UserModal';
import { IUserModel } from '@/utils/types';

export default function UserListWithModal() {
  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);

  return (
    <>
      <UserListContainer onUserClick={setSelectedUser} />
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  );
}
