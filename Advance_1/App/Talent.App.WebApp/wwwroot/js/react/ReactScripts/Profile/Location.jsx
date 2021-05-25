import React from 'react';
import Cookies from 'js-cookie';
import { default as countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

    }
    handleChange(event) {
        //required
        const name = event.target.name;
        let value = event.target.value;
        const id = event.target.id;
        var updateData = {
            target: { name: name, value: value }
        }

        //update props here
        this.props.controlFunc(updateData)

    }

    render() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.props.country
        const selectedCity = this.props.city;

        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);
        }

        return (
            <div>
                <div className="countryandcitydropdown">
                    <label className="locationlabel">country</label>
                    <select className="ui right labeled dropdown"
                        placeholder="country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country">

                        <option value="">Select a nationality</option>
                        {countriesOptions}
                    </select>
                </div>

                <div className="countryandcitydropdown">
                    <label className="locationlabel" >city</label>
                    <select className="ui right labeled dropdown"
                        placeholder="city"
                        value={selectedCity}
                        onChange={this.handleChange}
                        name="city">

                        <option value="">Select a city</option>
                        {popCities}
                    </select>
                </div>
                <div className="suburbinputfield" style={{ marginTop: ".5px", verticalAlign: "top" }}>
                    <ChildSingleInput
                        inputType="number"
                        label="Post code"
                        name="postCode"
                        defaultValue={this.props.postCode}
                        controlFunc={this.handleChange}
                        maxLength={80}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}></div>
            </div>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const details = props.details ?
            Object.assign({}, this.props.details)
            : {
                nationality: ""
            }

        this.state = {
            newContact: details
        };

        this.update = this.update.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
    }

    update() {
        console.log("mouse Enter!!")
        const details = Object.assign({}, this.props.details)
        this.setState({
            newContact: details
            //this.props.details.id
        })
    }

    componentDidUpdate(prevProps) {
        /*  console.log("componentDidUpdate") */
        if (this.props.details !== prevProps.details) {
            const details = Object.assign({}, this.props.details)
            this.setState({
                newContact: details
                //this.props.details.id
            })
        }
    }

    handleChange(event) {
        console.log(event.target.name)
        console.log(event.target.value)
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
        this.saveContact(data);
    }

    saveContact(data) {
        const number = this.state.newContact.number
        const re = /^[0-9\b]+$/
        if (!re.test(number)) {
            TalentUtil.notification.show("Please fill all the blanks", "error", null, null)
        } else {
            console.log("saveContact!!")
            // const data = Object.assign({}, this.state.newContact)
            console.log(data)
            this.props.controlFunc(this.props.componentId, data)
        }
    }

    render() {

        let countriesOptions = [];
        let selectedCountry = this.props.details.nationality


        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            // <div className="four wide column" onMouseEnter={this.update}>
            <div className="six wide column" >

                <select className="ui right labeled dropdown"
                    placeholder="nationality"
                    value={selectedCountry}
                    onChange={this.handleChange}
                    name="nationality">
                    <option value="">Select a nationality</option>
                    {countriesOptions}
                </select>
            </div>
        )

    }
}