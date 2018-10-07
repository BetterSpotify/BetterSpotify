import React, { PureComponent } from "react";
import { Mirror, Classes } from "../mirror/index";
import classNames from "classnames";
import { connect } from "react-redux";
import connectWithStore from "./connectWithStore";
const mapStateToProps = state => ({
  lastRequestedPageUri: state.pages.lastRequestedPageUri
});

class _SidebarListItem extends PureComponent {
  render() {
    const { title, url, lastRequestedPageUri } = this.props;
    return (
      <li
        className={classNames(
          Classes.Sidebar.SidebarListItem,
          lastRequestedPageUri.match(new RegExp(`^${url}`, "i")) &&
            Classes.Sidebar["SidebarListItem--is-active"]
        )}
      >
        <div>
          <div className={Classes.Sidebar.SidebarListItem__inner}>
            <div className={Classes.Sidebar.SidebarListItem__link}>
              <a
                className={Classes.Sidebar.SidebarListItemLink}
                draggable={false}
                href={url}
                data-sidebar-list-item-uri={url}
                data-ta-id="sidebar-list-item-link"
              >
                <span className={Classes.Sidebar.SidebarListItem__label}>
                  {title}
                </span>
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
//const SidebarListItem = connect(mapStateToProps)(_SidebarListItem);
const SidebarListItem = connectWithStore(
  Mirror.getStore(),
  _SidebarListItem,
  mapStateToProps
);
export default class SidebarList extends PureComponent {
  static Item = SidebarListItem;

  render() {
    const { title, children } = this.props;
    return (
      <div className={Classes.Sidebar.SidebarList}>
        <h2 className={Classes.Sidebar.SidebarList__title}>{title}</h2>
        <ul className={Classes.Sidebar.SidebarList__list}>{children}</ul>
      </div>
    );
  }
}
