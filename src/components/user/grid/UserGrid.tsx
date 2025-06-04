import { IUserGridModel } from '@/utils/types';
import Image from 'next/image';
import { SkeletonCard } from '@/components/skeleton/SkeletonCard';
import FadeLoaderWrapper from '@/components/skeleton/FadeLoaderWrapper';

export default function UserGrid({
  users,
  onUserClick,
  loading = false,
  usersPerPage = 9,
}: IUserGridModel) {
  const SkeletonGrid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: usersPerPage }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );

  const RealGrid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <button
          key={user.login.uuid}
          onClick={() => onUserClick(user)}
          className="text-left bg-white shadow-md rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50"
        >
          <Image
            className="w-16 h-16 rounded-full"
            src={user.picture.thumbnail}
            alt="avatar"
            width={64}
            height={64}
            priority
            unoptimized
          />
          <div>
            <p className="font-semibold">
              {user.name.first} {user.name.last}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <FadeLoaderWrapper loading={loading} skeleton={SkeletonGrid}>
      {RealGrid}
    </FadeLoaderWrapper>
  );
}
