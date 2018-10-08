import React, { PureComponent } from "react";
import classNames from "classnames";
import { Classes } from "../../mirror";
export default class Content extends PureComponent {
  /*
    static propTypes = {
      className: PropTypes.string,
      hasDivider: PropTypes.bool,
      dividerHeader: PropTypes.string
    }
   */
  static defaultProps = {
    hasDivider: false,
    dividerHeader: ""
  };
  render() {
    const { className, hasDivider, dividerHeader, children } = this.props;
    return (
      <div
        className={classNames(
          Classes.Glue.Content.container,
          Classes.Glue.Content["app-content"]
        )}
      >
        {hasDivider && (
          <div
            className={classNames(
              Classes.Glue.Row.row,
              Classes.Glue.Row["section-divider"]
            )}
          >
            <h3 className={Classes.Glue.Row["section-title"]}>
              {dividerHeader}
            </h3>
          </div>
        )}
        {/*<div className={classNames(Classes.Glue.Row.row, className)}>*/}
        {children}
        {/*</div>*/}
      </div>
    );
  }
}
