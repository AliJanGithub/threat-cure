// import Demo from "../../../models/Demo";
// import User from "../../../models/User";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     if (!body || Object.keys(body).length === 0) {
//       return NextResponse.json(
//         { error: "Please enter all required fields" },
//         { status: 400 }
//       );
//     }

//     const { partnerNetId, email } = body;

//     if (!partnerNetId || !email) {
//       return NextResponse.json(
//         { error: "Provide all the details" },
//         { status: 400 }
//       );
//     }

//     // STEP 1: Verify user used demo request
//     const demoUser = await Demo.findOne({ userEmail: email });

//     if (!demoUser) {
//       return NextResponse.json(
//         { error: "Please request a demo first" },
//         { status: 401 }
//       );
//     }

//     // STEP 2: Check if user already exists in User table
//     let user = await User.findOne({ email });

//     let isFirstTime = false;

//     if (!user) {
//       // First time ever → create user
//       user = await User.create({
//         name: demoUser.userName,
//         partnerNetId,
//         email,
//         password: null, // REQUIRED FOR FIRST TIME
//       });

//       isFirstTime = true;
//     } else {
//       // User exists
//       if (user.password === null) {
//         // Has account but never set password → still first-time logic
//         isFirstTime = true;
//       } else {
//         isFirstTime = false; // Returning user
//       }
//     }

//     // STEP 3: Create secure cookie
//     const res = NextResponse.json(
//       {
//         result: "Partner-Net signin successful",
//         mode: isFirstTime, // TRUE = needs password setup
//       },
//       { status: 200 }
//     );

//     res.cookies.set(
//       "partnerNetSession",
//       JSON.stringify({
//         partnerNetId,
//         email,
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
//     console.log("SIGNIN ERROR:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import Demo from "../../../models/Demo";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Please enter all required fields" },
        { status: 400 }
      );
    }

    const { partnerNetId, email } = body;

    if (!partnerNetId || !email) {
      return NextResponse.json(
        { error: "Provide all the details" },
        { status: 400 }
      );
    }

    // STEP 1: Verify user used demo request
    const demoUser = await Demo.findOne({ userEmail: email });

    if (!demoUser) {
      return NextResponse.json(
        { error: "Please request a demo first" },
        { status: 401 }
      );
    }

    // STEP 2: Check if user already exists in User table
    let user = await User.findOne({ email });

    let isFirstTime = false;

    if (!user) {
      // First time ever → create user
      user = await User.create({
        name: demoUser.userName,
        partnerNetId,
        email,
        password: null, // REQUIRED FOR FIRST TIME
      });

      isFirstTime = true;
    } else {
      // User exists
      if (user.password === null) {
        // Has account but never set password → still first-time logic
        isFirstTime = true;
      } else {
        isFirstTime = false; // Returning user
      }
    }

    // STEP 3: Create RESPONSE with TEMPORARY cookie
    const res = NextResponse.json(
      {
        result: "Partner-Net signin successful",
        mode: isFirstTime, // TRUE = needs password setup
      },
      { status: 200 }
    );

    // DO NOT set partnerNetSession cookie yet!
    // Instead, set a temporary cookie for password flow
    res.cookies.set(
      "signinFlow",
      JSON.stringify({
        partnerNetId,
        email,
        mode: isFirstTime ? "set-password" : "compare-password"
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/partner-net",
        maxAge: 15 * 60, // 15 minutes for password setup
      }
    );

    return res;
  } catch (error) {
    console.log("SIGNIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}