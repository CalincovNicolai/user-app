import { IUserFieldModel } from '@/utils/types';

export default function UserField({ label, value }: IUserFieldModel) {
  if (!value) return null;

  return (
    <div className="text-sm">
      <strong className="text-gray-700">{label}:</strong>{' '}
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
