import {jwtVerify} from 'jose'
import {NextRequest, NextResponse} from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const verifyJWT = async (jwt: string) => {
  const {payload} = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  )

  return payload
}

export default async function middleware(req: NextRequest, res: NextResponse) {
  const {pathname} = req.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/register') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const cookieName = process.env.COOKIE_NAME

  if (!cookieName) throw new Error('COOKIE_NAME undefined')

  const jwt = req.cookies.get(cookieName)

  if (!jwt) {
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }

  try {
    await verifyJWT(jwt.value)
    return NextResponse.next()
  } catch (e) {
    console.error(e)
    req.nextUrl.pathname = '/signin'
    return NextResponse.redirect(req.nextUrl)
  }
}
