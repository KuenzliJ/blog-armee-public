import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Asynchronous function to handle POST requests
export async function POST(req: any, res: any) {
  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = await req.json();

    // Check if a user with the same username or email already exists in the database
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    // If a user exists, log a message and return a JSON response with an error message
    if (exists) {
      console.log("Benutzer existiert bereits.");
      return NextResponse.json(
        { message: "Benutzername oder E-Mail exisiter bereits" },
        {
          status: 500,
        }
      );
    }

    // If the user does not exist, hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database with the hashed password
    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // Return a JSON response confirming the user registration
    return NextResponse.json(
      { message: "Benutzer registriert!" },
      { status: 201 }
    );
  } catch (error) {
    // Log any errors that occur during the registration process
    console.log("Fehler während der Registrierung", error);
    // Return a JSON response with an error message
    return NextResponse.json(
      { message: "Es ist ein Fehler bei der Registrierung aufgetretten" },
      { status: 500 }
    );
  }
}
