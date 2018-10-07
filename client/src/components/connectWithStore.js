import React from "react";
import { connect } from "react-redux";
export default (store, WrappedComponent, ...args) => {
  let ConnectedWrappedComponent = connect(...args)(WrappedComponent);
  return function(props) {
    return <ConnectedWrappedComponent {...props} store={store} />;
  };
};
