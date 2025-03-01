import { users, UserType } from "@/app/data"; // Importing user data and type definitions

// Defining the type for request parameters, where `params` is a Promise resolving to an object containing `id`
type ParamsType = {
  params: Promise<{ id: string }>;
};

// GET request handler: Retrieves a user by ID
export const GET = async (_request: Request, { params }: ParamsType) => {
  const { id } = await params; // Awaiting the resolved params to extract `id`
  const user = users.find((user) => user.id === +id); // Finding the user by ID (assuming `id` is stored as a number)

  // If user is not found, return a 404 response
  if (!user) {
    return new Response(
      JSON.stringify({
        error: "User not found",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      }
    );
  }

  // Return the found user as a JSON response
  return Response.json(user);
};

// PATCH request handler: Updates only the `age` field of a user
export const PATCH = async (request: Request, { params }: ParamsType) => {
  const { id } = await params; // Extracting `id` from params
  const body: UserType = await request.json(); // Parsing request body as JSON
  const { age } = body; // Extracting the `age` field from request body

  const index = users.findIndex((user) => user.id === +id); // Finding the index of the user by ID

  // Updating the age field of the found user
  users[index].age = age;

  // Returning the updated user as JSON
  return Response.json(users[index]);
};

// PUT request handler: Updates multiple fields (`fullName`, `age`, `job`) of a user
export const PUT = async (request: Request, { params }: ParamsType) => {
  const { id } = await params; // Extracting `id` from params
  const body: UserType = await request.json(); // Parsing request body as JSON
  const { fullName, age, job } = body; // Extracting required fields from the request body

  const index = users.findIndex((user) => user.id === +id); // Finding the index of the user by ID

  // If user is not found, return a 404 response
  if (index === -1) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  // Updating the user's data while preserving other existing fields
  users[index] = { ...users[index], fullName, age, job };

  // Returning the updated user as JSON
  return Response.json(users[index]);
};

export const DELETE = async (request: Request, { params }: ParamsType) => {
  const { id } = await params; // Extracting user ID from the request parameters
  const index = users.findIndex((user) => user.id === +id); // Finding the index of the user with the given ID

  // If user is not found, return a 404 response
  if (index === -1) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const deletedUser = users[index]; // Storing the user to return after deletion
  users.splice(index, 1); // Removing the user from the array

  // Returning the deleted user as a JSON response
  return Response.json(deletedUser);
};
