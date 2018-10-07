import React, { PureComponent } from "react";
import { Mirror, Classes } from "../mirror/index";
import connectWithStore from "./connectWithStore";

import Settings from "../pages/Settings.jsx";
const mapStateToProps = state => ({
  lastRequestedPageUri: state.pages.lastRequestedPageUri
});

const activeClass = {
  position: "absolute",
  height: "100%",
  top: 0,
  width: "100%"
};

class Watcher extends PureComponent {
  render() {
    const { lastRequestedPageUri } = this.props;
    if (lastRequestedPageUri !== "spotify:app:customspotify_settings") {
      return null;
    }
    return <Settings />;
    //return <div>We're on the CustomSpotify settings page.</div>;
  }
}

export default connectWithStore(CSMirror.getStore(), Watcher, mapStateToProps);
