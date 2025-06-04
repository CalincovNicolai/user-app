import { fetchUsers } from '@/api/fetchUsers';

global.fetch = jest.fn();

const mockUsers = [
  {
    login: { uuid: 'abc' },
    name: { first: 'Alice', last: 'Doe' },
    email: 'alice@example.com',
    picture: { thumbnail: 'avatar.jpg' },
  },
];

describe('fetchUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns user list when fetch succeeds', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockUsers }),
    });

    const users = await fetchUsers(1);
    expect(users).toEqual(mockUsers);
  });

  it('throws an error when fetch fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchUsers(1)).rejects.toThrow('Failed to fetch users');
  });
});
