import React, { PureComponent } from "react";
import Header from "../components/glue/Header.jsx";
import Content from "../components/glue/Content.jsx";

export default class Settings extends PureComponent {
  render() {
    return (
      <div>
        <Header title="CustomSpotify Settings" />
        <Content
          hasDivider={true}
          dividerHeader="Modify your CustomSpotify settings here"
        >
          a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
          a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
          a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
          a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
          a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />
        </Content>
      </div>
    );
  }
}
