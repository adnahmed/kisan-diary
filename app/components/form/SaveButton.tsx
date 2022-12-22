import CABIButton from "../cabi-button";

export default function SaveButton(props: JSX.IntrinsicElements["button"]) {
  return (
    <CABIButton {...props} type="submit">
      Save
    </CABIButton>
  );
}
