import { z } from "zod";
import Form from "~/components/form/form";
import { ActionArgs, redirect } from "@remix-run/node";
/*
    Return a consistent message for both existent and non-existent accounts.
    Ensure that the time taken for the user response message is uniform.
    Use a side-channel to communicate the method to reset their password.*
    Use URL tokens for the simplest and fastest implementation.*
    Ensure that generated tokens or codes are:
        Randomly generated using a cryptographically safe algorithm.
        Sufficiently long to protect against brute-force attacks.
        Stored securely.
        Single use and expire after an appropriate period.
    Do not make a change to the account until a valid token is presented, such as locking out the account
*/
const schema = z.object({
  email: z.string(),
});

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  /* send jwt to email */
  return redirect(`/app`, {
    status: 302,
    headers: {
      RESET_EMAIL_SENT_TO: email ?? "",
    },
  });
}
function ForgotPassword() {
  return (
    <main>
      <Form schema={schema} />
    </main>
  );
}
export default ForgotPassword;
