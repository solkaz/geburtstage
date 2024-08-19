/**
 * A person to track the birthday of
 */
export type Friend = {
  /**
   * Name of the friend. This can include the last name if desired.
   */
  name: string;
  /**
   * When the friend was born. Year of birth is optional.
   */
  dateOfBirth: {
    day: number;
    month: number;
    year?: number;
  };
};
