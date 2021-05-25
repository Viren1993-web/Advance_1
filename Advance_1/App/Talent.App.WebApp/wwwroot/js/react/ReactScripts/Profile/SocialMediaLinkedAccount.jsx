/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.details.linkedAccounts ?
            Object.assign({}, this.props.details.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }

        this.state = {
            showEditSection: false,
            //  newContact: details,
            linkedAccounts: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.openLinkedIn=this.openLinkedIn.bind(this)
        this.openGit=this.openGit.bind(this)
    }

    openEdit() {
        console.log("openEdit called!!");
        const linkedAccounts = Object.assign({}, this.props.details.linkedAccounts)
        this.setState({
            showEditSection: true,
            linkedAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.linkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            linkedAccounts: data
        })
        console.log("handlechange link account")
        console.log(this.state.linkedAccounts)
    }

    saveContact() {
        if(this.state.linkedAccounts.linkedIn!==""&&this.state.linkedAccounts.github!==""){
        console.log("saveContact called!!")
        // const data = Object.assign({}, this.state.linkedAccounts)
        const linkedAccounts = Object.assign({}, this.state.linkedAccounts)

        const data = Object.assign({}, this.props.details)
        data.linkedAccounts = linkedAccounts

        console.log(data)
        console.log(this.props.details.linkedAccounts)
        this.props.controlFunc(this.props.componentId, data)
        this.closeEdit()
        }else{
            TalentUtil.notification.show("Fill all the Blanks", "error", null, null)
        }
      
    }

    componentDidMount() {
        /*  $('.ui.button.social-media')
             .popup(); */
    }

    openLinkedIn() {
        if (this.props.details.linkedAccounts.linkedIn.indexOf("https://") === 0) {
            window.open(`${this.props.details.linkedAccounts.linkedIn}`, "_blank")
        } else if (this.props.details.linkedAccounts.linkedIn !== "") {
            window.open(`https://${this.props.details.linkedAccounts.linkedIn}`, "_blank")
        } else {
            alert("Invalid LinkedIn Url");
        }
    }

    openGit() {
        console.log("Hello")
         if (this.props.details.linkedAccounts.github.indexOf("https://") === 0) {
             window.open(`${this.props.details.linkedAccounts.github}`, "_blank")
         } else if(this.props.linkedAccounts.github !== ""){
             window.open(`https://${this.props.details.linkedAccounts.github}`, "_blank")
         } else {
             alert("Invalid Github Url");
         }
   /*       this.closeEdit()
        window.open(`https://${this.props.details.linkedAccounts.github}`, "_blank")
        console.log(this.props.details.linkedAccounts.github)
 */
    }

    render() {
        console.log(this.state.showEditSection)
        return (
            this.state.showEditSection === true ? this.renderEdit() :  this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.linkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                // placeholder="Enter your LinkedIn url"
                // errorMessage="Please enter a valid LinkedIn url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.linkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub url"
                    errorMessage="Please enter a valid GitHub url"
                />
                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <Button className='socialmediabutton' primary onClick={this.openLinkedIn} >LinkdIn</Button>
                    <Button className='socialmediabutton' secondary onClick={this.openGit}>GitHub</Button>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}