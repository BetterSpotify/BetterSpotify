import React, { PureComponent } from "react";
import connectWithStore from "./connectWithStore";
import Registrar from "../Registrar";
import Frame from "react-frame-component";

const mapStateToProps = (state) => ({
  lastRequestedPageUri: state.pages.lastRequestedPageUri,
  pages: state.pages,
});
const initialContent = `
<!doctype html>
<html dir="ltr" lang="en">

<head>
  <meta charset="utf-8">

  <link href="https://browse.app.spotify.com/css/glue.css" rel="stylesheet">
  <link href="https://browse.app.spotify.com/css/main.css" rel="stylesheet">

</head>

<body class="body-container--mac body-container--rtl-off is-main-content-page-iframe scrollbar-style-visible-mac"
  data-top-bar-height="48" id="app-mount"></body>

</html>`;

class Watcher extends PureComponent {
  render() {
    const { lastRequestedPageUri, pages } = this.props;

    if (!Registrar.pageOverwriteExists(lastRequestedPageUri)) {
      return null;
    }
    let pageOverwrite = Registrar.getPageOverwrite(lastRequestedPageUri);
    let Component = pageOverwrite.component;
    return (
      <Frame
        className="active"
        initialContent={initialContent}
        mountTarget="#app-mount"
      >
        <Component />
      </Frame>
    );
    //return <div>We're on the CustomSpotify settings page.</div>;
  }
}

export default connectWithStore(Mirror.getStore(), Watcher, mapStateToProps);
