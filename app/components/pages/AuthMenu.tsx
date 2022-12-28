import { Form, Link } from "@remix-run/react";

interface AuthMenuProps {
  onOpenLogIn: () => void;
  isLoggedIn: boolean;
}
export default function AuthMenu({ isLoggedIn, onOpenLogIn }: AuthMenuProps) {
  return (
    <div className="menu">
      {!isLoggedIn ? (
        <div>
          <Link to="/join">
            <div className="join">Sign Up</div>
          </Link>
          <Link to="login">
            <div onClick={onOpenLogIn} className="login">
              Log In
            </div>
          </Link>
        </div>
      ) : (
        <Form method="post" action="/logout" data-netlify="true">
          <button type="submit">Logout</button>
        </Form>
      )}
    </div>
  );
}
