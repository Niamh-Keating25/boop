import { InputHTMLAttributes } from "react";
import "./FileUpload.css";

interface Props {
  setSelectedFile: (selectedFile: File) => void;
}

const FileUpload: React.FC<Props> = ({ setSelectedFile }) => {
  const handleFileSelect: InputHTMLAttributes<HTMLInputElement>["onChange"] = (event) => {
    if (event.target?.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="file-upload__input-container">
      <div className="file-used-elements">
        <input id="file-upload" name="file" type="file" onChange={handleFileSelect} className="file-upload__input" />
      </div>
    </div>
  );
};

export default FileUpload;
