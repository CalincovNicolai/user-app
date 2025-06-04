import { IUserDetailsCardModel } from '@/utils/types';
import UserHeader from '@/components/user/header/UserHeader';
import UserFieldGrid from '@/components/user/field/UserFieldGrid';

export default function UserDetailsCard({ user, backButton }: IUserDetailsCardModel) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow relative">
        {backButton && <div className="mb-4">{backButton}</div>}
        <UserHeader user={user} />
        <UserFieldGrid user={user} />
      </div>
    </div>
  );
}
