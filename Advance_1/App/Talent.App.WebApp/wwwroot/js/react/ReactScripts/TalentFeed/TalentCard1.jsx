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

    // ismode=this.state.isvideomode

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

    return (
      <div>
        {feedData.map((talent) => {
          return (
            <div className="card-holder" style={{ marginBottom: "10px" }}>
              {this.state.rowkey === talent.id 
              ? (
                        <img
                          className="feed-img"
                          src={
                            talent.photoId
                              ? talent.photoId
                              : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                          }
                        />
              ) : (
                <div className="ui raised link job card">
                    <video className="talent_video" controls>
                      <source src={talent.videoUrl} type="video/mp4" />
                    </video>
                  <div className="extra content grid">
                    <i
                      class="user icon"
                      onClick={() => this.handleVideo(talent.id)}
                    ></i>
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
