import type { MetaFunction } from "@remix-run/node";
import React from "react";
import CABIButton from "~/components/cabi-button";
import uploadFile from "~/helpers/uploadFile";
export const handle = {
  title: "Manuals",
};
export const meta: MetaFunction = () => {
  return {
    title: "Manuals",
    description: "Expert's Saved Manuals",
  };
};
export default function Manuals() {
  const documentRef = React.useRef<HTMLInputElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);

  function uploadDocument() {
    const documentInput = documentRef.current;
    if (!documentInput) return; // might error
    const document = documentInput.files;
    if (!document) return;
    uploadFile(document[0]);
  }
  return (
    <div className="manuals">
      <input className="manuals__input--name" ref={nameRef} type="text" />
      <input
        className="manuals__input--file"
        ref={documentRef}
        accept=".pdf,.docx,.xls,.jpeg,.mp4,.mp3"
        type="file"
      />
      <CABIButton
        className="manuals__upload upload__button"
        onClick={uploadDocument}
        type="submit"
      >
        Upload Manual
      </CABIButton>
    </div>
  );
}
