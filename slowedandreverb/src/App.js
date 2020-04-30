import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";

import FrontPage from "./ui/frontpage";

// background style
const sectionStyle = {
  backgroundImage: `url(https://i.pinimg.com/originals/ae/0d/3d/ae0d3d761ef0df692bf0b98b1ac35ca2.gif)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
};

const backgroundImages = [
  "https://cdn140.picsart.com/309995500237201.gif?to=min&r=1024",
  "https://i.pinimg.com/originals/ae/0d/3d/ae0d3d761ef0df692bf0b98b1ac35ca2.gif",
  "https://media.giphy.com/media/tVwYkNyossifS/giphy.gif",
  "https://66.media.tumblr.com/0508d47b68152c95ffdfbf862ab6a887/tumblr_pk86geOgIX1rhk4rn_540.gif",
  "https://24.media.tumblr.com/62e106b03d4c0c009494e6dac50716fe/tumblr_mvspw99lHS1sul5vzo1_500.gif",
  "https://data.whicdn.com/images/316698273/original.gif",
  "https://66.media.tumblr.com/dfc796e8192bfde5864b6611daa568bf/tumblr_osev3lVly21qaaytso2_500.gifv",
  "https://media1.giphy.com/media/k7NJ5Yf81LxSg/source.gif",
  "https://media3.giphy.com/media/10YNiJcgMZZUly/source.gif",
  "https://i.pinimg.com/originals/f6/21/b6/f621b606f99a3abec1c4f07e2532aba0.gif",
  "https://media.giphy.com/media/10CDnY301bkUb6/giphy.gif",
  "https://66.media.tumblr.com/b1e8563fe4af770e856427e9d5caeacc/tumblr_olris8r38g1w05w8zo1_400.gifv",
  "https://media1.tenor.com/images/64e0334d77b0976b808147bd160b8534/tenor.gif?itemid=12379724",
  "https://i.pinimg.com/originals/29/90/54/29905476b7a794ab136d34edfe279318.gif",
  "https://media0.giphy.com/media/GK8yc7ueaCB32/source.gif",
  "https://i.pinimg.com/originals/ae/c9/7d/aec97db7a3fc771a5155d98fc96e7a3b.gif",
  "https://66.media.tumblr.com/891cad00332405f986fb8bbcb1fa0456/tumblr_pqkoiuhAVM1vk9tw4_540.gif",
  "https://i.pinimg.com/originals/6e/13/80/6e138032944a57d65ca997887c9c6717.gif",
  "https://66.media.tumblr.com/72e6aa414f2797e0cd6080ac26fd85bb/tumblr_pcsvexSuDs1x0j068o1_400.gifv",
  "https://78.media.tumblr.com/9e52d32dacd35cea3c53d0a340935ef2/tumblr_otgmitCHhk1viiyyio1_500.gif",
  "https://i.pinimg.com/originals/d3/5a/4c/d35a4c8bfe826e69fff9b668e23df31e.gif",
  "https://media3.giphy.com/media/1ojbJNlEYHdHW/source.gif",
  "https://media2.giphy.com/media/z7hasBhVc2Og8/source.gif",
  "https://media.giphy.com/media/rX0VO4YJcrjqw/giphy.gif",
  "https://media.giphy.com/media/DBWfOnlvqhElw4ONPi/giphy.gif",
  "https://media0.giphy.com/media/4Z3ViBtgYKHhG50kO9/giphy.gif",
  "https://media.giphy.com/media/b29IZK1dP4aWs/giphy.gif",
  "https://i.pinimg.com/originals/35/53/16/3553165251286a865a2de425261c1a45.gif",
  "https://media1.giphy.com/media/cPQC8FMOiILlK/source.gif",
  "https://i.pinimg.com/originals/5f/49/ac/5f49ac12c3164c3bf7385cd2a2bb80d1.gif",
  "https://data.whicdn.com/images/331719619/original.gif",
  "https://i.pinimg.com/originals/bc/71/a5/bc71a530c3e62a4a19d1df1b73f8b13d.gif",
  "https://giffiles.alphacoders.com/907/90728.gif",
  "https://i.pinimg.com/originals/bb/57/27/bb5727b7dc3493b86e6140906c58ddf5.gif",
  "https://thumbs.gfycat.com/UnequaledRemarkableIriomotecat-small.gif",
  "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/07/tumblr_nmvrs6ubl71qze3hdo1_r1_500.gif",
  "https://thumbs.gfycat.com/ImpossibleFrightenedAmericancrow-size_restricted.gif",
];
var backgroundIndex = 0;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: backgroundImages[0],
    };
    this.handleClick = this.handleClick.bind(this);
  }

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

  handleClick() {
    if (backgroundIndex >= backgroundImages.length - 1) {
      backgroundIndex = 0;
    } else {
      backgroundIndex++;
    }
    this.setState({
      background: backgroundImages[backgroundIndex],
    });
    console.log(this.state.background);
  }

  render() {
    return (
      <div
        className="cComponent"
        style={{
          backgroundImage: `url(${this.state.background})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Button
          style={{
            backgroundColor: "#8c2fa8",
          }}
          variant="contained"
          color="primary"
          onClick={this.handleClick}
        >
          Change Background Gif
        </Button>
        <FrontPage style=".App" />
      </div>
    );
  }
}

export default App;
