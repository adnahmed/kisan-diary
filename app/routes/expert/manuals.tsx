import type { MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import React, { useState } from "react";
import { route } from "routes-gen";
import CABIButton from "~/components/cabi-button";
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
  const namingFormRef = React.useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();
  const [askDocumentNaming, setAskDocumentNaming] = useState(false);
  async function uploadDocument() {
    const documentInput = documentRef.current;
    if (!documentInput) return; // might error
    const documents = documentInput.files;
    if (!documents) return;
    const namingForm = namingFormRef.current;
    if (!namingForm) return;
    const formData = new FormData();
    for (let i = 0; i < documents.length; i++) {
      formData.append(`file`, documents[i], documents[i].name);
    }
    await fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: route("/api/save_files"),
    });
  }

  return (
    <div className="manuals">
      <input
        className="manuals__input--file"
        multiple
        ref={documentRef}
        accept="audio/*,video/*,image/*,application/msword,application/pdf,application/vnd.ms-excel"
        type="file"
      />
      <CABIButton
        className="manuals__upload upload__button"
        onClick={() => setAskDocumentNaming(true)}
        type="submit"
      >
        Upload
      </CABIButton>
      {askDocumentNaming && (
        <div ref={namingFormRef}>
          {Array.from(documentRef.current?.files || []).map((file) => {
            return (
              <input
                key={file.name + file.size}
                type="text"
                name="filename"
                defaultValue={file.name}
              />
            );
          })}
          <CABIButton type="submit" onClick={uploadDocument}>
            Save Changes
          </CABIButton>
        </div>
      )}
      {fetcher.data && <p>{JSON.stringify(fetcher.data)}</p>}
    </div>
  );
}
