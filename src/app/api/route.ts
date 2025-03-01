import { NextRequest } from "next/server"; // Importing Next.js request type for handling API requests
import { users, UserType } from "../data"; // Importing user data and type definition

// GET request handler: Returns the list of users, optionally filtered by a search query
export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams; // Extracting search parameters from the request URL
  const query = searchParams.get("query"); // Retrieving the "query" parameter from the request

  // Filtering users based on the query if it exists
  const filteredUsers = query
    ? users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(query) || // Matching full name (case-insensitive)
          user.age.toString().includes(query) || // Matching age (as a string)
          user.job.toLowerCase().includes(query) // Matching job title (case-insensitive)
      )
    : users; // If no query is provided, return the full list of users

  // Returning the filtered list of users as a JSON response
  return new Response(JSON.stringify(filteredUsers), {
    headers: {
      "Content-Type": "application/json",
    },
  });
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
