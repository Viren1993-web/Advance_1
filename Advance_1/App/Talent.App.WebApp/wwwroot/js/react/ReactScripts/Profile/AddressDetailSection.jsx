import React, { Component } from "react";
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Address } from './Location.jsx';
export class AddressDetailSection extends Component {
    constructor(props) {
        super(props)

        const address = props.details.address ?
            Object.assign({}, props.details.address)
            : {               
                     number:"",
                     street:"",
                     suburb:"",
                     postCode:"",
                     city:"",
                     country:"" 
            }

        this.state = {
            showEditSection: false,
            address: address
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const address = Object.assign({}, this.props.details.address)
        this.setState({
            showEditSection: true,
            address: address
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.address)
        data[event.target.name] = event.target.value
        this.setState({
            address: data
        })
    }

    saveContact() {
       const address = Object.assign({}, this.state.address)

       const data = Object.assign({}, this.props.details)

       //address is object of profile data with set of properties
       data.address=address

       console.log(data)
       this.props.controlFunc(this.props.componentId, data)

       this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        return (
            <div className='ui sixteen wide column'>
               <div className="numberinputfield">
                <ChildSingleInput
                    inputType="text"
                    label="Number"
                    name="number"
                    value={this.state.address.number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    // placeholder="Enter your first name"
                    // errorMessage="Please enter a valid first name"
                />
                </div>
                <div className="streetinputfield">
                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={this.state.address.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                   // placeholder="Enter your last name"
                    // errorMessage="Please enter a valid last name"
                />
                </div>
                <div className="suburbinputfield">
                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={this.state.address.suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    // placeholder="Enter an email"
                    // errorMessage="Please enter a valid email"
                />
                </div>
                
                {/* Location: */}
                {/* <Address location={location} controlFunc={this.handleChange}/> */}
                <div style={{ marginBottom:"20px"}}></div>
                
                <Address city={this.state.address.city} country={this.state.address.country} postCode={this.state.address.postCode} controlFunc={this.handleChange}/>

                {/* <div className="suburbinputfield">
                <ChildSingleInput
                    inputType="number"
                    label="Post code"
                    name="postcode"
                    value={this.state.newContact.postcode}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    // placeholder="Enter your first name"
                    // errorMessage="Please enter a valid first name"
                />
                </div> */}
                

                <div style={{ marginBottom:"20px"}}></div>

                {/* <ChildSingleInput
                    inputType="text"
                    label="Phone number"
                    name="phone"
                    value={this.state.newContact.address.suburb}
                    controlFunc={this.handleChange}
                    maxLength={12}
                    placeholder="Enter a phone number"
                    errorMessage="Please enter a valid phone number"
                /> */}

                <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        console.log("Address")
        console.log(this.props.details.address)
        let address = this.props.details.address ? `${this.props.details.address.number}, ${this.props.details.address.street},${this.props.details.address.suburb},${this.props.details.address.postCode}` : ""
        let city = this.props.details.address ? this.props.details.address.city : ""
        let country = this.props.details.address ? this.props.details.address.country : ""

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}