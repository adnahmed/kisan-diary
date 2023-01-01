import { Form, Link } from "@remix-run/react";
import CABIButton from "../cabi-button";

export function UnauthenticatedMenu() {
  return (
    <div className="layout__menu menu__authentication">
      <Link to="/join">
        <CABIButton invert={true}>Sign Up</CABIButton>
      </Link>
      <Link to="/login">
        <CABIButton invert={true}>Log In</CABIButton>
      </Link>
    </div>
  );
}

export function AuthenticatedMenu() {
  return (
    <div>
      <Form method="post" action="/logout" data-netlify="true">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
