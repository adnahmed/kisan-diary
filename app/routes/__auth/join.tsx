import type { ActionFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { createUserSession, getUserId } from "~/session.server";
import { createUser, getUserByEmail } from "~/models/user.server";
import Form from "../../components/form/form";

const ParamsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  repeatPassword: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  rememberMe: z.boolean(),
});

const mutation = makeDomainFunction(ParamsSchema)(async (values) => {
  const existingUser = await getUserByEmail(values.email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          firstName: null,
          lastName: null,
        },
      },
      { status: 400 }
    );
  }
  const user = await createUser(values.email, values.password);
  return { userId: user.id, remember: values.rememberMe };
});

const formAction = ({ request, schema, mutation, successPath }) =>
  createUserSession({
    request,
    userId: mutation.userId,
    remember: mutation.remember,
    redirectTo: successPath,
  });

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema: ParamsSchema,
    mutation,
    successPath: "/",
  });

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default () => <Form schema={ParamsSchema} />;
