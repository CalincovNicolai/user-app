import { IUserFieldGridModel, IUserModel } from '@/utils/types';
import { userFields } from '@/utils/constants';
import UserField from '@/components/user/field/UserField';

export default function UserFieldGrid({ user }: IUserFieldGridModel) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
      {userFields.map((field) => (
        <UserField
          key={field.value}
          label={field.label}
          value={
            field.format
              ? field.format(user)
              : (user[field.value as keyof IUserModel] as string | number) || 'N/A'
          }
        />
      ))}
    </div>
  );
}
