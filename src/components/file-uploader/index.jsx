import React from "react";
import { useState } from "react";

//TODO: check if photo loaded on submit button, if its used in forms.
//TODO: add spinner while uploading picture
export default function FileUploader({
  className,
  handleFileUpload,
  text = "Upload",
  children,
}) {
  const uploadedText = "Uploaded";
  const hiddenFileInput = React.useRef(null);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (event) => {
    setFileUploaded(false);
    handleFileUpload(event.target.files[0]);
    setFileUploaded(true);
  };

  return (
    <div className={className}>
      <button
        className="flex bg-blue-600 px-5 py-3 rounded-3xl text-white"
        onClick={handleClick}
      >
        {children}
        {fileUploaded ? uploadedText : text}
      </button>
      <input
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </div>
  );
}
