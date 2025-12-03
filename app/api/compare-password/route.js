// import User from "../../../models/User";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     // =============================
//     // 1. Validate input
//     // =============================
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // =============================
//     // 2. Check user exists
//     // =============================
//     const user = await User.findOne({ email });

//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist. Please sign up first." },
//         { status: 404 }
//       );
//     }

//     // =============================
//     // 3. Check if password was ever set
//     // =============================
//     if (!user.password) {
//       return NextResponse.json(
//         { error: "Please set your password first." },
//         { status: 401 }
//       );
//     }

//     // =============================
//     // 4. Compare password
//     // =============================
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Wrong password. Try again." },
//         { status: 401 }
//       );
//     }

//     // =============================
//     // 5. Create secure session cookie
//     // =============================
//     const res = NextResponse.json(
//       {
//         message: "Login successful",
//         user: {
//           name: user.name,
//           email: user.email,
//           partnerNetId: user.partnerNetId,
//         },
//       },
//       { status: 200 }
//     );

//     res.cookies.set(
//       "partnerNetSession",
//       JSON.stringify({
//         email: user.email,
//         partnerNetId: user.partnerNetId,
//       }),
//       {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//       }
//     );

//     return res;

//   } catch (error) {
//     console.log("LOGIN ERROR:", error);
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
        { error: "User does not exist. Please sign up first." },
        { status: 404 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "Please set your password first." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Wrong password. Try again." },
        { status: 401 }
      );
    }

    const res = NextResponse.json(
      {
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
          partnerNetId: user.partnerNetId,
        },
      },
      { status: 200 }
    );

    // Set final session cookie
    res.cookies.set(
      "partnerNetSession",
      JSON.stringify({
        email: user.email,
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

    // Clear temporary cookie
    res.cookies.delete("signinFlow");

    return res;

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}