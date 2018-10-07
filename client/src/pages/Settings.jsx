import React, { PureComponent } from "react";
import Header from "../components/glue/Header.jsx";

export default class Settings extends PureComponent {
  render() {
    return (
      <div>
        <Header title="CustomSpotify Settings" />
        <div
          className="app-content container bfs-container"
          data-interaction-context="body"
        >
          <div className="row" data-child-container="">
            sup
          </div>
        </div>
      </div>
    );
  }
}
