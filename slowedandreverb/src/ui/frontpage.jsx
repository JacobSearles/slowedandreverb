import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import "../App.css";
import styled from "styled-components";

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
  } = useDropzone({ accept: "image/*" });

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>Drop your song file here, or click to choose your file</p>
      </Container>
    </div>
  );
}

const audioFileMaxSize = 300000000; // bytes

const sectionStyle = {
  backgroundImage: `url(https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/07/tumblr_nmvrs6ubl71qze3hdo1_r1_500.gif)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
};

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mp3: null };
  }

  handleOnDrop = (files, rejectedFiles) => {
    console.log("accepted: ", files);
    console.log("rejected: ", rejectedFiles);
    if (rejectedFiles && rejectedFiles.length > 0) {
      alert("File too big");
    }
    if (files && files.length > 0) {
      console.log(files[0]);
      this.setState({ mp3: files[0] });
    }
  };

  render() {
    return (
      <div className="cComponent" style={sectionStyle}>
        <div className="Dropzone">
          <StyledDropzone />
        </div>
      </div>
    );
  }
}

export default FrontPage;

{
  /* <Dropzone
              style={dropzoneStyle}
              onDrop={this.handleOnDrop}
              maxSize={audioFileMaxSize}
              multiple={false}
              acceptFiles="audio/*"
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop Audio File Here</p>
                  </div>
                </section>
              )}
            </Dropzone> */
}
