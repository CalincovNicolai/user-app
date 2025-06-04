import { useState, useMemo } from 'react';
import { ISortEnum, IUserModel } from '@/utils/types';

export function useUserListControls(users: IUserModel[], usersPerPage: number) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<ISortEnum>(ISortEnum.NONE);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        if (!normalizedSearchTerm) return true;

        const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
        return (
          fullName.includes(normalizedSearchTerm) ||
          user.email.toLowerCase().includes(normalizedSearchTerm)
        );
      }),
    [users, normalizedSearchTerm],
  );

  const sortedUsers = useMemo(
    () =>
      [...filteredUsers].sort((a, b) => {
        if (sortBy === ISortEnum.NAME) {
          const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
          const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
          return nameA.localeCompare(nameB);
        }

        if (sortBy === ISortEnum.EMAIL) {
          return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
        }

        return 0;
      }),
    [filteredUsers, sortBy],
  );

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const paginatedUsers = useMemo(
    () => sortedUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage),
    [sortedUsers, currentPage, usersPerPage],
  );

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    filteredUsers,
    paginatedUsers,
    totalPages,
  };
}
