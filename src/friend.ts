import { z } from 'zod';
import { createNewUuid } from './utils/uuid';

export const FriendSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => createNewUuid()),
  name: z.string().min(0),
  dateOfBirth: z.object({
    // Restricts day to 1 - 31, though doesn't validate impossible dates like Feb. 31 - that is handled separately
    day: z.number().gte(1).lte(31),
    month: z.number().gte(1).lte(12),
    year: z
      .number()
      .lte(new Date().getFullYear()) // Shouldn't allow for people that haven't been born yet
      .optional(),
  }),
});

export const FriendsListSchema = z.array(FriendSchema);

export type Friend = z.infer<typeof FriendSchema>;
export type FriendsList = z.infer<typeof FriendsListSchema>;

export type DateOfBirth = Friend['dateOfBirth'];

export type FriendDisplay = Friend & {
  daysUntilBirthday: number;
  age?: number;
};
