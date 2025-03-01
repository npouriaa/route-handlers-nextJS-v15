// Defining the structure for a User object
export type UserType = {
  id: number;
  fullName: string;
  age: number;
  job: string;
};

// An array of users with predefined data
export const users: UserType[] = [
  {
    id: 1,
    fullName: "Pouria Navipour",
    age: 18,
    job: "Frontend developer",
  },
  {
    id: 2,
    fullName: "John Doe",
    age: 26,
    job: "Backend developer",
  },
  {
    id: 3,
    fullName: "Jane Doe",
    age: 20,
    job: "UI/UX Designer",
  },
];
