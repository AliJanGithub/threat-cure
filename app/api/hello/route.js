import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({test:"tested successfully"},{status:200});
}
