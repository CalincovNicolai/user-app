import { IUserModel } from '@/utils/types';

export async function fetchUsers(count = 20): Promise<IUserModel[]> {
  const res = await fetch(`https://randomuser.me/api/?results=${count}`);
  if (!res.ok) throw new Error('Failed to fetch users');

  const data = await res.json();
  return data.results;
}
