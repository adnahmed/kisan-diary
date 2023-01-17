import type { FC } from "react";
import React from "react";
import { Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

interface Props {}

const ComponentPreviews: FC<Props> = () => {
  return <Previews palette={<PaletteTree/>}>

  </Previews>;
};

export default ComponentPreviews;
