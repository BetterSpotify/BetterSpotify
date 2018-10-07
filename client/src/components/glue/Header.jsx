import React, { PureComponent } from "react";
import classNames from "classnames";
import { Mirror, Classes } from "../../mirror/index";

export default class Header extends PureComponent {
  /*
  static propTypes = {
    title: PropTypes.string.isRequired
    isNavbar: PropTypes.bool
  }
  static defaultProps = {
    isNavbar: false
  } */
  state = {
    showSticky: false
  };
  render() {
    const { title, isNavbar } = this.props;
    const { showSticky } = this.state;
    return (
      <header
        className={Classes.Glue.Header["app-header"]}
        data-glue-page-header
        data-ta-id="page-header"
        data-glue-page-header-sticky-height="116"
      >
        <div data-node="header">
          <header className={Classes.Glue.Header["glue-page-header"]}>
            <div
              className={Classes.Glue.Header["glue-page-header__background"]}
              data-glue-page-header-background
            >
              <div
                className={
                  Classes.Glue.Header["glue-page-header__background-color"]
                }
              />
              <div
                className={
                  Classes.Glue.Header["glue-page-header__background-overlay"]
                }
              />
              {/*<div
            className={
              Classes.Glue.Header["glue-page-header__background-scroll-overlay"]
            }
          />*/}
            </div>
            <div
              className={classNames(
                Classes.Glue.Header["glue-page-header__content-wrapper"],
                Classes.Glue.container
              )}
              data-glue-page-header-content
            >
              <div className={Classes.Glue.Header["glue-page-header__content"]}>
                <div
                  className={
                    Classes.Glue.Header["glue-page-header__content-inner"]
                  }
                  data-ta-id="page-header-inner-content"
                >
                  <div
                    className={Classes.Glue.Header["glue-page-header__data"]}
                  >
                    <h1
                      className={Classes.Glue.Header["glue-page-header__title"]}
                      data-uri
                      data-ta-id="page-header-title"
                      data-glue-page-header-title
                      dir="auto"
                    >
                      <span
                        className={
                          Classes.Glue.Header["glue-page-header__title-text"]
                        }
                      >
                        {title}
                      </span>
                    </h1>
                    <div
                      className={
                        Classes.Glue.Header["glue-page-header__buttons"]
                      }
                    />
                  </div>
                  <div
                    className={Classes.Glue.Header["glue-page-header__spacer"]}
                  />
                  <div
                    className={Classes.Glue.Header["glue-page-header__buttons"]}
                  />
                </div>
              </div>
            </div>
            {showSticky && (
              <div
                className={
                  Classes.Glue.Header["glue-page-header__sticky-wrapper"]
                }
                data-sticky-fixed-wrapper
              >
                <div
                  className={Classes.Glue.Header["glue-page-header__sticky"]}
                  data-sticky
                  data-ta-id="sticky-node"
                >
                  <div className={Classes.Glue.container}>
                    <div
                      className={
                        Classes.Glue.Header["glue-page-header__sticky-inner"]
                      }
                    >
                      <h1
                        className={
                          Classes.Glue.Header["glue-page-header__title"]
                        }
                        data-uri
                        data-ta-id="page-header-title"
                        data-glue-page-header-title
                        dir="auto"
                      >
                        <span
                          className={
                            Classes.Glue.Header["glue-page-header__title-text"]
                          }
                        >
                          {title}
                        </span>
                      </h1>
                      <div
                        className={
                          Classes.Glue.Header["glue-page-header__buttons"]
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>
        </div>
      </header>
    );
  }
}
