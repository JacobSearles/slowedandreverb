import React from "react";
import "./App.css";

import FrontPage from "./ui/frontpage";

// background style
const sectionStyle = {
  backgroundImage: `url(https://media1.tenor.com/images/194765a761a9bbe6ad26f868c5285d34/tenor.gif?itemid=10632622)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
};

class App extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="cComponent" style={sectionStyle}>
        <FrontPage style=".App" />
      </div>
    );
  }
}

export default App;
