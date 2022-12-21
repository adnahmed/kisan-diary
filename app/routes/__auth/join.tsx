import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import { InputError, makeDomainFunction } from "domain-functions";
import { createUserSession, getUserId } from "~/session.server";
import { createUser, getUserByEmail, User } from "~/models/user.server";
import Form from "~/components/form/form";
import { performMutation } from "remix-forms";
import styles from "~/styles/routes/join.css";
import { Link, UseNumberInputProps } from "@chakra-ui/react";
import cleanString from "~/helpers/cleanString";
const schemaObject = {
  firstName: z.preprocess(cleanString, z.string()),
  lastName: z.preprocess(cleanString, z.string()),
  email: z.preprocess(cleanString, z.string().email()),
  password: z.preprocess(cleanString, z.string()),
  repeatPassword: z.preprocess(cleanString, z.string()),
  address: z.preprocess(cleanString, z.string()),
  region: z.preprocess(cleanString, z.string()),
  rememberMe: z.boolean(),
};
const schema = z.object(schemaObject);

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const mutation = makeDomainFunction(schema)(async (values) => {
  const existingUser = await getUserByEmail(values.email);
  if (existingUser)
    throw new InputError("A user already exists with this email", "email");
  let { rememberMe, repeatPassword, region, ...userInput } = values;

  const user = await createUser({
    ...userInput,
    role: "farmer",
    region: region,
  });
  return { userId: user.id, remember: values.rememberMe, role: user.role };
});

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  if (result.success)
    return await createUserSession({
      request,
      userId: result.data.userId,
      remember: result.data.remember,
      redirectTo: `/app/${result.data.role}`,
    });
  else return json(result, 400);
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
    <div className="grid grid-cols-12 bg-auto bg-[rgb(54,135,41)] h-screen join text-white">
      <span className="col-start-1 col-end-13 text-4xl content-center place-self-center text-center flex justify-center">
        Registeration
      </span>
      <div className="col-start-4 col-end-10 row-start-2">
        <Form schema={schema} />
      </div>
    </div>
  </>
);
