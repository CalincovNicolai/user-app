import { renderHook, act } from '@testing-library/react';
import { ISortEnum, IUserModel } from '@/utils/types';
import { useUserListControls } from '@/hooks/useUserListControls';

const mockUsers: IUserModel[] = [
  {
    login: { uuid: '1' },
    name: { first: 'Alice', last: 'Smith' },
    email: 'alice@example.com',
  } as IUserModel,
  {
    login: { uuid: '2' },
    name: { first: 'Bob', last: 'Johnson' },
    email: 'bob@example.com',
  } as IUserModel,
  {
    login: { uuid: '3' },
    name: { first: 'Charlie', last: 'Brown' },
    email: 'charlie@example.com',
  } as IUserModel,
];

describe('useUserListControls', () => {
  it('returns all users initially', () => {
    const { result } = renderHook(() => useUserListControls(mockUsers, 2));

    expect(result.current.paginatedUsers.length).toBe(2);
    expect(result.current.totalPages).toBe(2);
  });

  it('filters users by name or email', () => {
    const { result } = renderHook(() => useUserListControls(mockUsers, 10));

    act(() => {
      result.current.setSearchTerm('bob');
    });

    expect(result.current.filteredUsers.length).toBe(1);
    expect(result.current.filteredUsers[0].email).toBe('bob@example.com');
  });

  it('sorts users by name', () => {
    const { result } = renderHook(() => useUserListControls(mockUsers, 10));

    act(() => {
      result.current.setSortBy(ISortEnum.NAME);
    });

    const sortedNames = result.current.paginatedUsers.map((u) => `${u.name.first} ${u.name.last}`);

    expect(sortedNames).toEqual(['Alice Smith', 'Bob Johnson', 'Charlie Brown']);
  });

  it('sorts users by email', () => {
    const { result } = renderHook(() => useUserListControls(mockUsers, 10));

    act(() => {
      result.current.setSortBy(ISortEnum.EMAIL);
    });

    const emails = result.current.paginatedUsers.map((u) => u.email);
    expect(emails).toEqual(['alice@example.com', 'bob@example.com', 'charlie@example.com']);
  });

  it('handles pagination correctly', () => {
    const { result } = renderHook(() => useUserListControls(mockUsers, 2));

    expect(result.current.totalPages).toBe(2);
    expect(result.current.paginatedUsers.length).toBe(2);

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.paginatedUsers.length).toBe(1);
    expect(result.current.paginatedUsers[0].email).toBe('charlie@example.com');
  });
});
