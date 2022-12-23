import { extendTheme } from "@chakra-ui/react";
import headingTheme from "./components/heading";

const colors = {
  900: "#1a365d",
  800: "#153e75",
  700: "#2a69ac",
  cabi: "#368729",
  wheat: "#feffe6",
};
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const theme = extendTheme({
  colors,
  config,
  components: {
    Heading: headingTheme,
  },
});
export default theme;
