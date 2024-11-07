import { FriendsListSchema, FriendsList, Friend } from '../friend';

export const LOCAL_STORAGE_KEY = 'geburtstage:friends';

export function getFriends(): FriendsList {
  try {
    const rawValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    // Handle there not being any values in localStorage
    if (rawValue === null) {
      return [];
    }
    return FriendsListSchema.parse(JSON.parse(rawValue));
  } catch (error) {
    console.log({ error });

    throw new Error(
      'Data in localStorage is malformed and could not be parsed',
    );
  }
}

export function updateFriends(friends: FriendsList) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(friends));
}
