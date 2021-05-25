import React from 'react';
import Cookies from 'js-cookie';

export default class Description extends React.Component {

    constructor(props) {
        super(props);

        const details = props.details ?
            Object.assign({}, this.props.details)
            : {
                description: "",
                summary: ""
            }
        this.state = {
            newContact: details,
            showEditSection: false
        };
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    };

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        console.log("viren", event.target.value);
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
        //console.log(data)
    }

    saveContact() {
        const D = this.state.newContact.description.length;
        const S = this.state.newContact.summary.length;
        console.log("S", S)
        console.log("D:", D)
        if (D < 150 || D > 600 || S <= 0 || S > 150) {
            TalentUtil.notification.show("Please Write your Characters Between Given Range", "error", null, null)
        } else {
            const data = Object.assign({}, this.state.newContact)
            /* console.log(data) */

            this.props.controlFunc(this.props.componentId, data)
            this.closeEdit()
        }
    }

    openEdit() {
        console.log("update called!!")
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    render() {
        return (
            this.state.showEditSection === true ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        let summary = this.props.details.summary
        let description = this.props.details.description
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                </div>
                <div id="descriptiontextareadiv" className="ten wide column">
                    <div className="field" >
                        <input
                            type="text"
                            name="summary"


                            placeholder="Please provide a short summary about your self"
                            defaultValue={summary}
                            onChange={this.handleChange}
                            onBlur={this.update}
                        />
                    </div>
                    <p>Summary must be no more than 150 characters</p>
                    <div className="field" >
                        <textarea
                            maxLength={600}
                            minLength={150}
                            required
                            name="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            defaultValue={description}
                            onChange={this.handleChange}
                            onBlur={this.update}

                        />
                    </div>
                    <p>Description must be between 150-600 characters</p>
                    <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </React.Fragment>
        )
    }
    renderDisplay() {
        const descriptionCharacterLimit = 600;
        const summaryCharacterLimit = 150;
        const summaryCharacterLimitMin = 1;
        const descriptionCharacterLimitMin = 150;

        let summary = this.props.details.summary
        let description = this.props.details.description
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                </div>
                <div id="descriptiontextareadiv" className="ten wide column">
                    <div className="field" >
                        <input
                            type="text"
                            readOnly
                            name="summary"
                            maxLength={summaryCharacterLimit}
                            minLength={summaryCharacterLimitMin}
                            required
                            placeholder="Please provide a short summary about your self"
                            defaultValue={summary}
                            controlFunc={this.handleChange}
                        /*onBlur={this.update} */
                        />
                    </div>
                    <p>Summary must be no more than 150 characters</p>
                    <div className="field" >
                        <textarea
                            maxLength={descriptionCharacterLimit}
                            minLength={descriptionCharacterLimitMin}
                            readOnly
                            name="description"
                            placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
                            defaultValue={description}
                            controlFunc={this.handleChange}
                        /*onBlur={this.update} */

                        />
                    </div>
                    <p>Description must be between 150-600 characters</p>
                    <button type="button" className="ui right floated teal button"
                        onClick={this.openEdit}>Edit</button>
                </div>
            </React.Fragment>
        )
    }
}
