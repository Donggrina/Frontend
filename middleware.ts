import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { MiddlewareData } from './utils/constants/middleware-data';

const { PROTECTED_PAGES, PUBLIC_PAGES, NON_FAMILY_PAGES, FAMILY_PAGES } = new MiddlewareData();

export default function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request;
  const path = nextUrl.pathname;
  const hasCookie = cookies.has('accessToken');
  const hasFamily = cookies.get('isFamily')?.value === 'true';
  const isProtectedPage = PROTECTED_PAGES.some((page) => path.startsWith(page));
  const isPublicPage = PUBLIC_PAGES.includes(path);
  const isNonFamilyPage = NON_FAMILY_PAGES.includes(path);
  const isFamilyPage = FAMILY_PAGES.some((page) => path.startsWith(page));

  // 정적 파일 요청 필터링
  if (
    path.startsWith('/_next/') ||
    path.startsWith('/images/') ||
    path.startsWith('/fonts/') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 배포할 때 삭제----------------------------------------------------------
  const hasQuery = nextUrl.search.includes('accessToken');
  if (path === '/start-family') {
    if (hasQuery || hasCookie) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }
  }
  // -----------------------------------------------------------------------

  // 로그인 상태일 때 접근 불가
  if (hasCookie && isPublicPage) {
    const redirectUrl = hasFamily ? '/family' : '/start-family';
    return NextResponse.redirect(new URL(redirectUrl, request.nextUrl.origin));
  }

  // 비로그인 상태일 때 접근 불가
  if (!hasCookie && isProtectedPage) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // 가족이 있을 때 접근 불가
  if (hasCookie && hasFamily && isNonFamilyPage) {
    return NextResponse.redirect(new URL('/family', request.nextUrl));
  }

  // 가족이 없을 때 접근 불가
  if (hasCookie && !hasFamily && isFamilyPage) {
    return NextResponse.redirect(new URL('/start-family', request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
