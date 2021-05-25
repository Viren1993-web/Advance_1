import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player';

export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);
       
    }

    
    
    render() {
       return(
        <div className="ui raised link job card snapshot">
            <div class="head">
               <span>name</span>
               <span><i class="star icon"></i></span>
            </div>
            <div className="video">
                <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/matt.jpg" />
            </div>  
            <div className="extra content">
                <div className="top floated">
                     <i class="video icon"></i>
                    <i class="file pdf outline icon"></i>
                    <i class="linkedin icon"></i>
                    <i class="github icon"></i>                
                </div> 
                <div class="bottom floated">
                    <button className="ui blue basic button">Apply now</button>
                </div>           
            </div>
        </div>
       )
    }
}