import { users, UserType } from "../data"; // Importing user data and type definition

// GET request handler: Returns the list of all users
export const GET = async () => {
  return new Response(JSON.stringify(users)); // Responding with the entire users array as JSON
};

// POST request handler: Adds a new user to the users list
export const POST = async (request: Request) => {
  const user: UserType = await request.json(); // Parsing request body as JSON

  // Validate required fields before processing
  if (!user.fullName || !user.age || !user.job) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Creating a new user object with an incremented ID
  const newUser: UserType = {
    id: users.length + 1, // Assigning ID based on current array length (might cause issues if users are deleted)
    fullName: user.fullName,
    age: user.age,
    job: user.job,
  };

  users.push(newUser); // Adding the new user to the list

  // Returning the updated users array with a 201 (Created) status
  return new Response(JSON.stringify(users), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
};
