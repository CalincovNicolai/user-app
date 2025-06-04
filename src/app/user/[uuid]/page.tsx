import { notFound } from 'next/navigation';
import { fetchUsers } from '@/api/fetchUsers';
import Link from 'next/link';
import UserDetailsCard from '@/components/user/details/UserDetailsCard';

type UserDetailPageParams = {
  params: {
    uuid: string;
  };
};

export default async function UserDetailPage({ params }: UserDetailPageParams) {
  // Cannot get the specific user by id because the random api everytime randomizes the data on fetch
  // Also, cannot use the user list from localStorage because on server side it doesn't know about it
  // I'm just getting 1 user from api and display here
  const count = params.uuid ? 1 : 0;
  const userList = await fetchUsers(count);
  const user = userList[0];

  if (!user) return notFound();

  return (
    <UserDetailsCard
      user={user}
      backButton={
        <Link
          href="/"
          className="px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded hover:bg-gray-200 transition"
        >
          ← Back to list
        </Link>
      }
    />
  );
}
