import Button from "./button";

export default function SaveButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <Button {...props} type="submit">
      Save
    </Button>
  );
}
