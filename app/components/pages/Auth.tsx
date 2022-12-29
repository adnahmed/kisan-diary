import { Form, Link } from "@remix-run/react";
export function UnauthenticatedMenu() {
  return (
    <div>
      <Link to="/join">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}
export function AuthenticatedMenu() {
  return (
    <Form method="post" action="/logout" data-netlify="true">
      <button type="submit">Logout</button>
    </Form>
  );
}
