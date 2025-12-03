import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Logout successful"
    });

    // Clear all relevant cookies
    response.cookies.delete("partnerNetSession");
    response.cookies.delete("signinFlow");
    
    // You can also clear any other cookies you've set
    // response.cookies.delete("otherCookieName");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return await GET(); // Handle both GET and POST
}