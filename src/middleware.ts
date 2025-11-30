import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isLoged } from './utils/isLoged';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isLoginPage = request.nextUrl.pathname.startsWith('/login');
  const is404Page = request.nextUrl.pathname.startsWith('/404');

  if (!isLoginPage && !is404Page) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const { data } = await isLoged(token || '');

    if (!data) {
      request.cookies.delete('token');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // const hasPermissionResult = await hasPermission(token, request.nextUrl.pathname);
    // if (!hasPermissionResult && request.nextUrl.pathname !== '/dashboard') {
    //   return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // if (request.nextUrl.pathname === '/') {
    //   return NextResponse.redirect(new URL('/dashboard', request.url));
    // }
  }
}

// async function hasPermission(token: string, actualUrl: string) {
//   const { data: menuData } = await userGetInfo(token || '');
//   const urls = menuData?.userGetInfo?.Menu.map((item: any) => item.url);
//   return urls?.find((url: string) => url === actualUrl) || actualUrl.startsWith('/image');
// }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
