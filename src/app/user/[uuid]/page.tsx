import { notFound } from 'next/navigation';
import { fetchUsers } from '@/api/fetchUsers';
import Link from 'next/link';
import UserDetailsCard from '@/components/user/details/UserDetailsCard';

export default async function UserDetailPage({}: { params: { uuid: string } }) {
  // Cannot get the specific user by id because the random api everytime randomizes the data on fetch
  // Also, cannot use the user list from localStorage because on server side it doesn't know about it
  // I'm just getting 1 user from api and display here
  const userList = await fetchUsers(1);
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
