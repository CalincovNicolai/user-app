'use client';

import { useState } from 'react';
import UserListContainer from './UserListContainer';
import UserDetails from './UserDetails';
import { IUserModel } from '@/utils/types';

export default function UserListWithLinks() {
  const [selectedUser, setSelectedUser] = useState<IUserModel | null>(null);

  if (selectedUser) {
    return <UserDetails user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return <UserListContainer onUserClick={setSelectedUser} />;
}
