import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';
const visaTypes = [
  {
    key: 'citizen',
    text: 'Citizen',
    value: 'Citizen'
  },
  {
    key: 'Permanent Resident',
    text: 'Permanent Resident',
    value: 'Permanent Resident'
  },
  {
    key: 'Work Visa',
    text: 'Work Visa',
    value: 'Work Visa'
  },
  {
    key: 'Student Visa',
    text: 'Student Visa',
    value: 'Student Visa'
  },
]
export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);
    const details = props.details ?
      Object.assign({}, this.props.details)
      : {
        visaStatus: "",
        visaExpiryDate: ""
      }
    this.state = {
      isPropsAssigned: false,
      isVisaExpired: false,
      newContact: details,
      hideSave: false,
    };
    this.update = this.update.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveContact = this.saveContact.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
  }

  update() {
    if (!this.state.isPropsAssigned) {
      console.log("mouse Enter!!")
      const details = Object.assign({}, this.props.details)
      this.setState({
        newContact: details,
        isPropsAssigned: true,
      })
    }
  }

  handleChange(event) {
    console.log("handle change event called!!!")
    const data = Object.assign({}, this.state.newContact)
    data[event.target.name] = event.target.value
    this.setState({
      newContact: data
    })
    if (event.target.value == "Citizen" || event.target.value == "Permanent Resident") {
      const details = Object.assign({}, this.props.details)
      this.setState({
        newContact: details
      })

      const data = Object.assign({}, this.state.newContact)
      //do not know which property user accesing so use bracket notation
      data[event.target.name] = event.target.value
      //access the property using bracket notation
      data["visaExpiryDate"] = ""
      this.setState({
        newContact: data,
        isVisaExpired: false

      })
      //console.log(this.state.isVisaExpired)
    }
    else {
      const data = Object.assign({}, this.state.newContact)
      //console.log(`Expired : ${(data.visaExpiryDate).slice(0, 10)}`)
      data[event.target.name] = event.target.value
      this.setState({
        newContact: data,
        isVisaExpired: true,
        hideSave: true
      })
    }
  }
  /*  console.log(this.state.newContact)*/
  /* console.log(visaExpiryDate)  */

  saveContact() {
    const data = Object.assign({}, this.state.newContact)
    //console.log(data)
    const date = new Date().toLocaleDateString()
    console.log(`Today : ${(date).slice(0, 10)}`)
    const Expired = `Expired : ${(data.visaExpiryDate).slice(0, 10)}`
    console.log(Expired)

    if (moment(date).isAfter(Expired)) {
      TalentUtil.notification.show("Date InValid")
      this.setState({
        isVisaExpired: false,
        hideSave: false
      })

    }
    else {
      /*  TalentUtil.notification.show("Date valid") */
      this.props.controlFunc(this.props.componentId, data)
      this.setState({
        isVisaExpired: false,
        hideSave: false
      })
    }
  }
  render() {
    return (
      this.renderDisplay()
    )
  }
  renderDisplay() {
    let visaStatus = this.props.details.visaStatus
    let VisaExpiryDate = this.props.details.visaExpiryDate ? `Expired : ${(this.props.details.visaExpiryDate).slice(0, 10)}` : ""
    return (
      <div className='row'>
        <div className="ui sixteen wide column nationality" onMouseEnter={this.update}>
          <div className="visastatus"  >

            <label className="locationlabel">Visa type</label>

            <select class="ui dropdown"
              name="visaStatus"
              onChange={this.handleChange}
              style={{ height: "43px" }}
            >
              {/* <option value="" disabled defaultValue>{`${visaStatus} ${VisaExpiryDate}`}</option> */}
              <option value="Citizen">Citizen</option>
              <option value="Permanent Resident">Permanent Resident</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Student Visa">Student Visa</option>
            </select>
          </div>
          {this.state.isVisaExpired && <div className="visastatus"
            style={{ marginTop: ".5px", verticalAlign: "top" }}
          >
            <SingleInput
              inputType="date"
              label="Visa Expiry Date"
              name="visaExpiryDate"
              defaultValue={VisaExpiryDate}
              controlFunc={this.handleChange}
            />

          </div>
          }
          {this.state.hideSave && <div className="visastatus"

          >
            <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
          </div>}
        </div>
        <b><label className="locationlable">Visa Status: {`${visaStatus} ${VisaExpiryDate}`}</label></b>
      </div>

    )
  }
}