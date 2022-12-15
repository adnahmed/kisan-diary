export default function onChangeInput(setState) {
  return (e) => {
    setState(e.target.value)
  }
}
