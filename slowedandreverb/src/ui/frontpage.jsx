import React from "react";
import "../App.css";
import StyledDropzone from "./dragAndDrop";
import { makeAPICall } from "../api";

const sectionStyle = {
  backgroundImage: `url(https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/07/tumblr_nmvrs6ubl71qze3hdo1_r1_500.gif)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
};

const testApi = async () => {
  let send = {
    message: "hog",
  };
  fetch("/test", {
    method: "POST",
    body: JSON.stringify({ send }),
    headers: {
      "Content-Type": "applications/json",
    },
  }).then((res) => res.json());
};

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mp3: null };
  }

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
