import { useUsers } from '@/hooks/useUsers';
import { useUserListControls } from '@/hooks/useUserListControls';
import UserGrid from './grid/UserGrid';
import Pagination from '@/components/pagination/Pagination';
import SearchInput from '../search/SearchInput';
import { ISortEnum, IUserListContainerModel } from '@/utils/types';

export default function UserListContainer({
  onUserClick,
  usersPerPage = 9,
}: IUserListContainerModel) {
  const { users, loading, handleRefresh, cooldownLeft } = useUsers();
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    filteredUsers,
    paginatedUsers,
    totalPages,
  } = useUserListControls(users, usersPerPage);

  const handleFullRefresh = () => {
    setSearchTerm('');
    setSortBy(ISortEnum.NONE);
    handleRefresh();
  };

  return (
    <div className="p-4 flex flex-col">
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        onRefresh={handleFullRefresh}
        loading={loading}
        refreshCooldown={cooldownLeft}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {filteredUsers.length === 0 ? (
        <div className="w-full min-w-[1080px] min-h-[340px] flex flex-col justify-center">
          <p className="text-center">No users found</p>
        </div>
      ) : (
        <UserGrid
          users={paginatedUsers}
          onUserClick={onUserClick}
          loading={loading}
          usersPerPage={usersPerPage}
        />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        disabled={loading}
      />
    </div>
  );
}
