import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const audioFileMaxSize = 300000000; // bytes

// stage variables that will be sent in post request
const config = { headers: { "Content-Type": "multipart/form-data" } };
let formData = new FormData();
var currFile;

function onDrop(acceptedFiles, rejectedFiles) {
  if (
    rejectedFiles &&
    rejectedFiles.length > 0 &&
    rejectedFiles[0].size > audioFileMaxSize
  ) {
    alert("File is too big");
  }
  if (acceptedFiles && acceptedFiles.length > 0) {
    //console.log(acceptedFiles[0]);
    currFile = acceptedFiles[0];
  }
}

const onSubmit = async (acceptedFiles) => {
  formData.append("song", currFile);

  console.log("submit files: " + currFile);

  fetch("/upload-song", {
    method: "POST",
    body: formData,
  });
  formData = new FormData();
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 8px;
  border-radius: 8px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "audio/*",
    onDrop: onDrop,
    maxSize: audioFileMaxSize,
    maxFiles: 1,
  });

  const file = acceptedFiles.map((file) => <li>{file.path}</li>);

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <div align="center">
          <p>Drop your song file here, or click to choose your file</p>
        </div>
        <ul className="listFormat">{file}</ul>
      </Container>
      <Button
        variant="outlined"
        color="primary"
        onClick={(acceptedFiles) => onSubmit(acceptedFiles)}
      >
        Submit
      </Button>
    </div>
  );
}

export default StyledDropzone;
