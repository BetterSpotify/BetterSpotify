import React, { PureComponent } from "react";
import { Mirror, Classes } from "../mirror/index";
import connectWithStore from "./connectWithStore";
import Registrar from "../Registrar";
import Settings from "../pages/Settings.jsx";
const mapStateToProps = state => ({
  lastRequestedPageUri: state.pages.lastRequestedPageUri,
  pages: state.pages
});

const activeClass = {
  position: "absolute",
  height: "100%",
  top: 0,
  width: "100%"
};

class Watcher extends PureComponent {
  render() {
    const { lastRequestedPageUri, pages } = this.props;

    if (!Registrar.pageOverwriteExists(lastRequestedPageUri)) {
      return null;
    }
    let pageOverwrite = Registrar.getPageOverwrite(lastRequestedPageUri);
    let Component = pageOverwrite.component;
    return <Component />;
    //return <div>We're on the CustomSpotify settings page.</div>;
  }
}

export default connectWithStore(CSMirror.getStore(), Watcher, mapStateToProps);
