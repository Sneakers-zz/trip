import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true });
}
//console.log("Running a task every minute");
// Run a task every minute