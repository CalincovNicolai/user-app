import { renderHook, act } from '@testing-library/react';
import { fetchUsers } from '@/api/fetchUsers';
import toast from 'react-hot-toast';
import { USER_KEY } from '@/utils/constants';
import { useUsers } from '@/hooks/useUsers';

jest.mock('@/api/fetchUsers', () => ({
  fetchUsers: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockUsers = [
  {
    login: { uuid: '1' },
    name: { first: 'John', last: 'Doe' },
    email: 'john@example.com',
    picture: { thumbnail: 'avatar.jpg' },
  },
];

describe('useUsers', () => {
  beforeEach(() => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('loads users from localStorage if valid and not expired', async () => {
    const timestamp = Date.now();
    localStorage.setItem(USER_KEY, JSON.stringify({ users: mockUsers, timestamp }));

    const { result } = renderHook(() => useUsers());

    await act(() => Promise.resolve());

    expect(result.current.users).toEqual(mockUsers);
    expect(result.current.loading).toBe(false);
  });

  it('fetches users if localStorage is expired', async () => {
    const oldTimestamp = Date.now() - 999999999;
    localStorage.setItem(USER_KEY, JSON.stringify({ users: mockUsers, timestamp: oldTimestamp }));

    (fetchUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers());

    await act(() => Promise.resolve());

    expect(fetchUsers).toHaveBeenCalled();
    expect(result.current.users).toEqual(mockUsers);
  });

  it('fetches users if localStorage is missing', async () => {
    (fetchUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers());

    await act(() => Promise.resolve());

    expect(fetchUsers).toHaveBeenCalled();
    expect(result.current.users).toEqual(mockUsers);
  });

  it('shows success toast on manual refresh', async () => {
    (fetchUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    const { result } = renderHook(() => useUsers());

    await act(() => Promise.resolve());

    act(() => {
      result.current.handleRefresh();
    });

    await act(() => Promise.resolve());

    expect(toast.success).toHaveBeenCalledWith('User list refreshed');
    expect(fetchUsers).toHaveBeenCalled();
  });

  it('shows error toast on fetch failure', async () => {
    (fetchUsers as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useUsers());

    await act(() => Promise.resolve());

    act(() => {
      result.current.handleRefresh();
    });

    await act(() => Promise.resolve());

    expect(toast.error).toHaveBeenCalledWith('Failed to refresh users');
  });

  it('starts and counts down cooldown', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.handleRefresh();
    });

    expect(result.current.cooldownLeft).toBe(2);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.cooldownLeft).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.cooldownLeft).toBe(0);
  });

  it('prevents refresh during cooldown', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUsers());

    act(() => {
      result.current.handleRefresh();
    });

    const lastRefresh = result.current;

    act(() => {
      result.current.handleRefresh();
    });

    expect(result.current).toBe(lastRefresh);
  });
});
