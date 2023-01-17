import { Form, Link } from "@remix-run/react";
import { route } from "routes-gen";
import CABIButton from "../cabi-button";
export function UnauthenticatedMenu() {
  return (
    <div className="menu__authentication header__menu">
      <Link to={route("/join")}>
        <CABIButton invertVariant={true}>Sign Up</CABIButton>
      </Link>
      <Link to={route("/login")}>
        <CABIButton invertVariant={true}>Log In</CABIButton>
      </Link>
    </div>
  );
}

export function AuthenticatedMenu() {
  return (
    <div className="header__menu menu__authentication">
      <Form method="post" action={route("/logout")} data-netlify="true">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
