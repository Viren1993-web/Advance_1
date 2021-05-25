import React from 'react';
import Cookies from 'js-cookie';
import { Loader } from 'semantic-ui-react';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);        
        const details = props.details 
    }

    render() {  
        var data = this.props.details
        //console.log(data)
        let name = this.props.details ? this.props.details.name : ""
        let location = this.props.details ? `${this.props.details.location.city}, ${this.props.details.location.country}` : ""
        let phone = this.props.details ? this.props.details.phone : ""
        let email = this.props.details ? this.props.details.email : ""      
        return (
            <div className="ui card">
                <div className="content">                    
                    <div className="center aligned header">
                        <i className="huge circular file image outline icon"></i>
                        <p>{name}</p>
                        <p>{location}</p>
                    </div>
                    <div className="center aligned description">
                        <p>We currently do not have specific skills that we desire.</p>
                    </div>
                </div>
                <div className="extra content">
                    <div class="left-contact-detail">
                        <p><i class="phone icon"></i>:{phone}</p>
                        <p><i class="envelope icon"></i>:{email}</p>
                    </div>                   
                </div>
               
            </div>
            
        )
    }
}