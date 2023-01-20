import type {
  ActionFunction,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import { InputError, makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { route } from "routes-gen";
import { z } from "zod";
import Form from "~/components/form/form";
import cleanString from "~/helpers/cleanString";
import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import styles from "~/styles/routes/join.css";
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
      redirectTo: `/${result.data.role}`,
    });
  else return json(result, 400);
};
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect(route("/"));
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
