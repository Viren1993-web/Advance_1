import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Loader } from 'semantic-ui-react';
import TalentCard from '../TalentFeed/TalentCard.jsx';
import TalentDetail from '../TalentFeed/TalentDetail.jsx';
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from './CompanyProfile.jsx';
import Opportunity from '../EmployerFeed//Opportunity.jsx';
import Job from '../EmployerFeed/Job.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer")
        this.state = {
            loadNumber: 50,
            watchlist: [],
            loadingFeedData: false,
            companyDetails: [],

            loadPosition: 0,
            feedData: [],
            loaderData: loaderData,
            feed: { position: 0, number: 50 }
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadTalentData = this.loadTalentData.bind(this);
        this.handleScroll = this.handleScroll.bind(this)

    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.isLoading = false;
        this.loadTalentData()
        this.loadData(() =>
            this.setState({ loaderData, loadingFeedData: false })
        )
    }

    componentDidMount() {

        this.setState({
            loadingFeedData: false,
            feed: { position: 0, number: 50 }
        });
        this.init()

    }
    handleScroll(event) {

        let isloading = this.state.loadingFeedData

        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        if (bottom) {
            if (!isloading) {
                console.log("isloading")
                this.setState({
                    loadingFeedData: true
                });
                this.loadTalentData()
            }
        }
    }


    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            //url: ' https://talentprofileic.azurewebsites.net/profile/profile/getEmployerProfile',

            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                this.setState({
                    companyDetails: res.employer
                });
                // console.log(res)             
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    loadTalentData() {

        let num = this.state.feed.number + 50

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
            //url: 'https://talentprofileic.azurewebsites.net/profile/profile/getTalent',
            
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: this.state.feed,
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                this.setState({
                    feedData: res.data,
                    feed: { position: 0, number: num },
                    loadingFeedData: false
                });
                console.log(res.data)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile details={this.state.companyDetails.companyContact} />
                    </div>
                    <div id="scrollbardiv" className="eight wide column scrollbar" onScroll={this.handleScroll}>
                        <TalentCard details={this.state.feedData} />
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}