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
import Form from "~/components/form/form";
import styles from "~/styles/routes/join.css";

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const values = inputFromFormData(formData);
  const mutation = await createUserMutation({
    ...values,
    rememberMe: values.rememberMe === "on",
  });
  return await createUserSession({
    request,
    userId: mutation.userId,
    remember: mutation.remember,
    redirectTo: "/",
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

export default () => (
  <>
    <div className="grid grid-cols-12 bg-auto bg-[rgb(54,135,41)] text-white">
      <span className="col-start-4 col-end-6 text-4xl text-clip">
        Registeration
      </span>
      <div className="col-start-4 col-end-10 ">
        <Form schema={ParamsSchema} />
      </div>
    </div>
  </>
);
