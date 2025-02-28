import { connect } from "@/app/lib/models/dbConfig/dbConfig";
import User from "@/app/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
  try {
    // Connect to the database first
    await connect();
    
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Login attempt for:", email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    console.log("User found:", user.email);

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
        return NextResponse.json({ error: "Invalid password" }, { status: 400 });
      }
  
      console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
  
      if (!process.env.TOKEN_SECRET) {
        console.error("TOKEN_SECRET environment variable is not defined");
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
      }
    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email
    };
    
    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    
    return response;
  } catch (error: any) {
    console.error("Login API error:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}