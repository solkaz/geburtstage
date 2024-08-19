import { getFriends, LOCAL_STORAGE_KEY } from './localStorage';

describe('localStorage utils', () => {
  describe('getFriends', () => {
    it('returns an empty array if there is no entry at localStorage', () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      expect(getFriends()).toEqual([]);
    });

    it('throws if there is malformed data in localStorage', () => {
      [
        'not-an-array',
        ['not-an-array-of-objects'],
        [{ name: 'invalid-data' }],
      ].forEach((value) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
        expect(() => getFriends()).toThrowError(
          'Data in localStorage is malformed and could not be parsed'
        );
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      });
    });

    it('returns list of friends', () => {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify([
          {
            id: 'a2e78c10-7257-4ac8-888b-0d174a430118',
            name: 'Test with year of birth',
            dateOfBirth: { day: 1, month: 1, year: 1990 },
          },
          {
            id: '8d250312-5274-4b46-9027-d189357e5f7d',
            name: 'Test without year of birth',
            dateOfBirth: { day: 1, month: 1 },
          },
        ])
      );

      expect(getFriends()).toEqual([
        {
          id: 'a2e78c10-7257-4ac8-888b-0d174a430118',
          name: 'Test with year of birth',
          dateOfBirth: {
            day: 1,
            month: 1,
            year: 1990,
          },
        },
        {
          id: '8d250312-5274-4b46-9027-d189357e5f7d',
          name: 'Test without year of birth',
          dateOfBirth: {
            day: 1,
            month: 1,
          },
        },
      ]);
    });
  });
});
