import { Link as ChakraLink } from "@chakra-ui/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import React from "react";

import { $path } from "remix-routes";
import { route } from "routes-gen";
import WithModal from "~/components/pages/WithModal";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import { GlassCard } from "~/components/GlassCard";

export async function loader({ request }: LoaderArgs) {
  const user = await getUserId(request);
  if (user) return redirect(route("/"));
  return null;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { password: "Password is required", email: null } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: safeRedirect($path(route(`/${user.role}/home`)), route("/")),
  });
}

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || route("/");
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <div className="w-full max-w-md">
        <GlassCard className="border-t-4 border-primary-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to manage your farm and crops
            </p>
          </div>

          <Form
            method="post"
            className="space-y-6"
            noValidate
            data-netlify="true"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
                placeholder="you@example.com"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-600 text-sm" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-600 text-sm" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
              <div className="flex justify-end mt-1">
                <ChakraLink 
                  className="text-sm font-medium text-primary-600 hover:text-primary-500" 
                  href="forgot_password"
                >
                  Forgot Password?
                </ChakraLink>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign in
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                className="font-medium text-primary-600 hover:text-primary-500 hover:underline transition-colors"
                to={{
                  pathname: route("/join"),
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </Form>
        </GlassCard>
      </div>
    </div>
  );
}

export default () => (
  <WithModal
    Body={<LoginPage />}
    Header={<span>Login</span>}
    autoOpenUrl={route("/login")}
  />
);
