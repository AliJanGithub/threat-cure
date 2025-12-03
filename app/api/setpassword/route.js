// import User from "../../../models/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     // ===========================
//     // 1. Validate input
//     // ===========================
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // ===========================
//     // 2. Check user exists
//     // ===========================
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User not found" },
//         { status: 404 }
//       );
//     }

//     // ===========================
//     // 3. Prevent double password setup
//     // ===========================
//     if (user.password !== null) {
//       return NextResponse.json(
//         { error: "Password already set. Please sign in instead." },
//         { status: 400 }
//       );
//     }

//     // ===========================
//     // 4. Hash the password
//     // ===========================
//     const hashed = await bcrypt.hash(password, 10);

//     // ===========================
//     // 5. Save to database
//     // ===========================
//     user.password = hashed;
//     await user.save();

//     // ===========================
//     // 6. Set secure session cookie
//     // ===========================
//     const res = NextResponse.json(
//       { message: "Password set successfully" },
//       { status: 200 }
//     );

//     res.cookies.set(
//       "partnerNetSession",
//       JSON.stringify({
//         email,
//         partnerNetId: user.partnerNetId,
//       }),
//       {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7,
//       }
//     );

//     return res;
//   } catch (error) {
//     console.log("SET PASSWORD ERROR:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import User from "../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.password !== null) {
      return NextResponse.json(
        { error: "Password already set. Please sign in instead." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    // NOW set the final session cookie
    const res = NextResponse.json(
      { message: "Password set successfully" },
      { status: 200 }
    );

    res.cookies.set(
      "partnerNetSession",
      JSON.stringify({
        email,
        partnerNetId: user.partnerNetId,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    // Clear the temporary cookie
    res.cookies.delete("signinFlow");

    return res;
  } catch (error) {
    console.log("SET PASSWORD ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}