import { Form, Link } from "@remix-run/react";
import { route } from "routes-gen";
import Button from "../form/button";

export function UnauthenticatedMenu() {
  return (
    <div className="flex items-center gap-3">
      <Link to={route("/join")}>
        <Button className="bg-white text-primary-600 border border-primary-200 hover:bg-primary-50 hover:text-primary-700 shadow-none">
          Sign Up
        </Button>
      </Link>
      <Link to={route("/login")}>
        <Button>Log In</Button>
      </Link>
    </div>
  );
}

export function AuthenticatedMenu() {
  return (
    <div className="flex items-center">
      <Form method="post" action={route("/logout")} data-netlify="true">
        <button 
          type="submit" 
          className="text-sm font-medium text-surface-500 hover:text-red-600 transition-colors px-4 py-2 hover:bg-red-50 rounded-lg"
        >
          Logout
        </button>
      </Form>
    </div>
  );
}
