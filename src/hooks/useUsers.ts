import { useEffect, useState } from 'react';
import { CACHE_DURATION, USER_KEY } from '@/utils/constants';
import toast from 'react-hot-toast';
import { IUserModel } from '@/utils/types';
import { fetchUsers } from '@/api/fetchUsers';

export function useUsers() {
  const [users, setUsers] = useState<IUserModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  useEffect(() => {
    const cache = localStorage.getItem(USER_KEY);

    if (cache) {
      try {
        setLoading(true);
        const { users: cachedUsers, timestamp } = JSON.parse(cache);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (!isExpired && Array.isArray(cachedUsers)) {
          setUsers(cachedUsers);
          setLoading(false);
          return;
        }
      } catch {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  useEffect(() => {
    if (cooldownLeft === 0) return;

    const timer = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

  const loadUsers = (showSuccessToast = false) => {
    setLoading(true);
    fetchUsers(30)
      .then((data: IUserModel[]) => {
        setUsers(data);
        localStorage.setItem(USER_KEY, JSON.stringify({ users: data, timestamp: Date.now() }));

        if (showSuccessToast) toast.success('User list refreshed');
      })
      .catch(() => toast.error('Failed to refresh users'))
      .finally(() => setLoading(false));
  };

  const handleRefresh = () => {
    const now = Date.now();
    if (now - lastRefresh < 2000) return;

    setLastRefresh(now);
    setCooldownLeft(2);
    loadUsers(true);
  };

  return { users, loading, handleRefresh, cooldownLeft, setUsers };
}
