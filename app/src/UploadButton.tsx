import { useDropzone } from "react-dropzone";
import clsx from "clsx";
import { Button } from "@material-ui/core";

interface UploadButtonProps {
  onUpload(files: File[]): void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onUpload,
  });

  return (
    <Button
      variant="outlined"
      className={clsx("upload-button", { "drag-hover": isDragActive })}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        Drag-Drop / Upload
      </div>
    </Button>
  );
}
