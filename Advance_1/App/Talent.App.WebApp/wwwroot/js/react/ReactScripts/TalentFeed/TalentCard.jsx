import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Loader, Table } from "semantic-ui-react";
import { Popup, Icon } from "semantic-ui-react";
import { BodyWrapper, loaderData } from "../Layout/BodyWrapper.jsx";
import Cookies from "js-cookie";

export default class TalentCard extends React.Component {
  constructor(props) {
    super(props);
    let loader = loaderData;
    loader.allowedUsers.push("recruiter");
    let details = props.details;

    this.state = {
      rowkey: "",
      isvideomode: false,
    };

    this.handleVideo = this.handleVideo.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
  }

  handleVideo(rowkey) {
    console.log(rowkey);
    this.setState({
      rowkey: rowkey,
      // isvideomode: !ismode,
    });
  }

  handleProfile() {
    this.setState({
      rowkey: "",
    });
  }

  render() {
    let feedData = this.props.details;
    console.log(this.props.details);
    return (
      <div>
        {feedData.map((talent) => {
          key:""
          return (
            <div className="card-holder" style={{ marginBottom: "10px" }}>
              {this.state.rowkey === talent.id ? (
                <div className="ui raised link job card">
                  <div class="head card-head">
                    <div className="header left floated">{talent.name}</div>
                    <span className="right floated">
                      <i class="star icon"></i>
                    </span>
                  </div>

                  <div className="content">
                    <div className="left floated">
                      <div class="image">
                        <img
                          className="feed-img"
                          src={
                            talent.photoId
                              ? talent.photoId
                              : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                          }
                        />
                      </div>
                    </div>
                    <div class="right floated feed_card_detail">
                      <div className="header">Talent Snapshot</div>
                      <div className="meta">
                        <div className="header">CURRENT EMPLOYER</div>
                        <div class="description">
                          {talent.currentEmployment
                            ? talent.currentEmployment
                            : "no information provided"}
                        </div>
                      </div>
                      <div className="meta">
                        <span>VISA STATUS</span>
                        <div class="description">
                          {talent.visa
                            ? talent.visa
                            : "no visa status provided"}
                        </div>
                      </div>
                      <div className="meta">
                        <span>POSITION</span>
                        <div class="description">
                          {talent.level
                            ? talent.level
                            : "no information provided"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="extra content grid">
                    <i class="video icon" onClick={this.handleProfile}></i>
                    <i class="file pdf outline icon"></i>
                    <i class="linkedin icon"></i>
                    <i class="github icon"></i>
                  </div>

                  <div className="extra content">
                    <div className="bottom_text">C#</div>
                  </div>
                </div>
              ) : (
                <div className="ui raised link job card">
                  <div class="head card-head">
                    <div className="header left floated">{talent.name}</div>
                    <span className="right floated">
                      <i class="star icon"></i>
                    </span>
                  </div>

                  <div className="content">
                    <video className="talent_video" controls>
                      <source src={talent.videoUrl} type="video/mp4" />
                    </video>
                  </div>

                  <div className="extra content grid">
                    <i
                      class="user icon"
                      onClick={() => this.handleVideo(talent.id)}
                    ></i>
                    <i class="file pdf outline icon"></i>
                    <i class="linkedin icon"></i>
                    <i class="github icon"></i>
                  </div>

                  <div className="extra content">
                    <div className="bottom_text">C#</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
