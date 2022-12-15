import type { ActionFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import {
  inputFromForm,
  inputFromFormData,
  makeDomainFunction,
} from "domain-functions";
import { createUserSession, getUserId } from "~/session.server";
import { createUser, getUserByEmail, User } from "~/models/user.server";
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

const createUserMutation = makeDomainFunction(ParamsSchema)(async (values) => {
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
  const { rememberMe, repeatPassword, ...createUserValues } = values;
  const user = await createUser({ ...createUserValues, role: "farmer" });
  if (!user) throw new Error("Error occurred while creating User");
  return { userId: user.id, remember: values.rememberMe };
});

const formAction = async ({ request, schema, mutation, successPath }) => {
  return createUserSession({
    request,
    userId: mutation.userId,
    remember: mutation.remember,
    redirectTo: successPath,
  });
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = inputFromFormData(formData);
  const mutation = await createUserMutation({
    ...values,
    rememberMe: values.rememberMe === "on",
  });
  return await formAction({
    request,
    schema: ParamsSchema,
    mutation,
    successPath: "/",
  });
};
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
