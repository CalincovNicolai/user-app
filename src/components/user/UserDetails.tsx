import { IUserItemModel } from '@/utils/types';
import UserDetailsCard from '@/components/user/details/UserDetailsCard';

export default function UserDetails({ user, onBack }: IUserItemModel) {
  return (
    <UserDetailsCard
      user={user}
      backButton={
        <button
          onClick={onBack}
          className="px-3 py-1.5 bg-gray-100 text-sm text-gray-700 rounded hover:bg-gray-200 transition"
        >
          ← Back to list
        </button>
      }
    />
  );
}
