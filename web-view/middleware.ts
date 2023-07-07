import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
    const userToken = request.cookies.get('access_token')?.value;
    console.log("test:", userToken);
  console.log('token',userToken)
    if(!userToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/"],
};
