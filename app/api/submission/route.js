// import { NextResponse } from "next/server";
// import { connectDB } from "../../../lib/db";
// import Demo from "../../../models/Demo";

// export async function POST(req) {
//   try {
//     await connectDB();

//     let body;
//     try {
//       body = await req.json();
//       console.log("Received body:", body);
//     } catch (err) {
//       console.error("Failed to parse JSON:", err);
//       return NextResponse.json(
//         { error: "Invalid or empty JSON body" },
//         { status: 400 }
//       );
//     }

//     if (!body || Object.keys(body).length === 0) {
//       return NextResponse.json(
//         { error: "Request body is empty" },
//         { status: 400 }
//       );
//     }

//     const { mainCategory, subCategory, decideLater, userName, userEmail } = body;

//     // Validation
//     if (!mainCategory || !userName || !userEmail) {
//       return NextResponse.json(
//         { error: "Required fields missing" },
//         { status: 400 }
//       );
//     }
// const hasApplied = await Demo.findOne({ userEmail });

// if (hasApplied) {
//   return NextResponse.json(
//     { msg: "You have already applied for a demo" },
//     { status: 401 }
//   );
// }


//     // Save to MongoDB
//     const newRecord = await Demo.create({
//       mainCategory,
//       subCategory: subCategory || [],
//       decideLater: decideLater || false,
//       userName,
//       userEmail,
//     });

//     return NextResponse.json(
//       { success: true, id: newRecord._id.toString() },
//       { status: 201 }
//     );

//   } catch (err) {
//     console.error("API Route Error:", err);
//     return NextResponse.json(
//       { error: "Internal Server Error",err ,details: err.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Demo from "../../../models/Demo";
import { sendEmail } from "../../../lib/sendEmail";
import { error } from "console";

export async function POST(req) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or empty JSON body" },
        { status: 400 }
      );
    }

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    const { mainCategory, subCategory, decideLater, userName, userEmail } = body;

    if (!mainCategory || !userName || !userEmail) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    const hasApplied = await Demo.findOne({ userEmail });
    if (hasApplied) {
      return NextResponse.json(
        { msg: "You have already applied for a demo" },
        { status: 401 }
      );
    }

    const newRecord = await Demo.create({
      mainCategory,
      subCategory: subCategory || [],
      decideLater: decideLater || false,
      userName,
      userEmail,
    });

    // ---------------------------
    // 🚀 SEND EMAIL TO ADMIN HERE
    // ---------------------------
    const emailHtml = `
      <h2>New Demo Request</h2>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Main Category:</strong> ${mainCategory}</p>
      <p><strong>Sub Categories:</strong> ${subCategory?.join(", ")}</p>
      <p><strong>Decide Later:</strong> ${decideLater}</p>
      <br/>
      <p>Record ID: ${newRecord._id}</p>
    `;

    const emailSent = await sendEmail({
      to: "alijan061333@gmail.com",
      subject: "New Demo Submission From User",
      html: emailHtml,
    });
  console.log(emailSent)
    if (!emailSent.success) {
      console.error("Email Failed:", emailSent.error);
      // DO NOT fail request; email is optional
    }

    return NextResponse.json(
      { success: true, id: newRecord._id.toString() },
      { status: 201 }
    );

  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message ,error},
      { status: 500 }
    );
  }
}
