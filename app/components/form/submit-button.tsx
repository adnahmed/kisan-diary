import Button from "./button";

export default function SubmitButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <div className="flex justify-end">
      <Button {...props}>Submit</Button>
    </div>
  );
}
