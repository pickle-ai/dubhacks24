import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const session = await getSession();
  if (!session) {
    return (
        <a href="/api/auth/login">Log in</a>
    );
  } else {
    const user = session.user;
    return (
        session.user && (
            <div>              
              <a href="/api/auth/logout">Logout</a>
            </div>
        )
    );
  }
}