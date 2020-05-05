import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const audioFileMaxSize = 300000000; // bytes

// This is the file object that will be sent to the server
var currFile = undefined;

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
  margin: 20px;
  opacity: 0.9;
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
    accept: ["audio/mpeg", "audio/ogg", "audio/wav", "image/*"],
    onDrop: onDrop,
    maxSize: audioFileMaxSize,
    maxFiles: 1,
  });

  const file = acceptedFiles.map((file) => (
    <p className="listFormat">{file.path}</p>
  ));

  function onDrop(acceptedFiles, rejectedFiles) {
    if (
      rejectedFiles &&
      rejectedFiles.length > 0 &&
      rejectedFiles[0].size > audioFileMaxSize
    ) {
      alert("File is too big");
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      currFile = acceptedFiles[0];
      //this.setFile(acceptedFiles[0]);
      props.setFile(acceptedFiles[0]);
    }
  }

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <div align="center">
          <p>Drop your song file here, or click to choose your file</p>
          {file}
        </div>
      </Container>
    </div>
  );
}

export { StyledDropzone, currFile };
