import React from 'react'
import Cookies from 'js-cookie';
import { ChildSingleInput, SingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';
export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        const details = props.details
        this.state = {
            showEditSection: false,
            IsEditMode: false,
            rowkey: "",
            experience: { currentUserId: "", company: "", position: "", responsibilities: "", id: "" },
            experiences: []
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onClose = this.onClose.bind(this)
        this.addExperience = this.addExperience.bind(this)
        this.updateExperience = this.updateExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
        this.loadData = this.loadData.bind(this)
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
       /*  this.check = this.check.bind(this) */
        this.setDate = this.setDate.bind(this)
    }

    openEdit() {

        this.setState({
            showEditSection: true,
            experience: { currentUserId: this.props.details.id, company: "", position: "", responsibilities: "", start: "", end: "", id: "" }

        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
            experience: { currentUserId: this.props.details.id, company: "", position: "", responsibilities: "", start: "", end: "", id: "" }
        })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        // console.log("loadData called!!");
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getExperience',
            //url: ' https://talentprofileic.azurewebsites.net/profile/profile/getExperience',

            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log(res);
                this.updateWithoutSave(res.data)
            }.bind(this)
        })
    }

    //updates component's state without saving data
    updateWithoutSave(newValues) {
        // let newLanguageData = Object.assign({}, this.state.languageData, newValues)
        this.setState({
            // languageData: newLanguageData
            experiences: newValues
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.experience)
        console.log(event.target.name)
        console.log(event.target.value)
        data[event.target.name] = event.target.value
        this.setState({
            experience: data
        })
    }

    check(rowkey) {
        console.log("checked!!")
        this.setState({
            IsEditMode: true,
            rowkey: rowkey
        })
        // console.log(this.state.experience)
    }

    onEdit(rowkey, company, position, responsibilities, start, end) {
        console.log("onEdit!!")
        this.setState({
            IsEditMode: true,
            rowkey: rowkey,
            experience: { currentUserId: this.props.details.id, company: company, position: position, responsibilities: responsibilities, start: start, end: end, id: rowkey }
        })
    }

    onClose() {
        console.log("onClose!!")
        this.setState({
            IsEditMode: false,
            rowkey: "",
            experience: { currentUserId: this.props.details.id, company: "", position: "", responsibilities: "", start: "", end: "", id: "" }
        })
    }



    addExperience() {
        var cookies = Cookies.get('talentAuthToken');
        const Start = `Start : ${(this.state.experience.start).slice(0, 10)}`
        const End = `End : ${(this.state.experience.end).slice(0, 10)}`
        if (this.state.experience.company !== "" && this.state.experience.position !== "" && this.state.experience.responsibilities !== "" && this.state.experience.start !== "" && this.state.experience.end !== "") {
            if (moment(Start).isAfter(End)) {
                TalentUtil.notification.show("Date InValid")
                console.log(Start)
                console.log(End)
            } else {
                $.ajax({
                    //url: 'https://talentservicesprofile20201113.azurewebsites.net/profile/profile/updateTalentProfile',
                    url: 'http://localhost:60290/profile/profile/addExperience',
                    headers: {
                        'Authorization': 'Bearer ' + cookies,
                        'Content-Type': 'application/json'
                    },
                    type: "POST",
                    data: JSON.stringify(this.state.experience),
                    success: function (res) {
                        this.loadData()
                        console.log(res)
                        if (res.success == true) {
                            TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                        } else {
                            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                        }
                    }.bind(this),
                    error: function (res, a, b) {
                    }
                })
                this.closeEdit()
            }
        } else {
            TalentUtil.notification.show("Please fill all  the blanks", "error", null, null)
        }
    }

    updateExperience() {

        var cookies = Cookies.get('talentAuthToken');
        const Start = `Start : ${(this.state.experience.start).slice(0, 10)}`
        const End = `End : ${(this.state.experience.end).slice(0, 10)}`
        if (this.state.experience.company !== "" && this.state.experience.position !== "" && this.state.experience.responsibilities !== "" && this.state.experience.start !== "" && this.state.experience.end !== "") {
        if (moment(Start).isAfter(End)) {
            TalentUtil.notification.show("Date Invalid", "error", null, null)
            console.log(Start)
            console.log(End)
        } else {
            $.ajax({
                //url: 'https://talentservicesprofile20201113.azurewebsites.net/profile/profile/updateTalentProfile',
                url: 'http://localhost:60290/profile/profile/updateExperience',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.experience),
                success: function (res) {
                    this.loadData()
                    console.log(res)
                    if (res.success == true) {
                        TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                    } else {
                        TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                    }
                }.bind(this),
                error: function (res, a, b) {
                }
            })
            this.onClose();
        }
    }else{
        TalentUtil.notification.show("Please Fill all the Blanks", "error", null, null)
    }
    }


    deleteExperience(id) {
        console.log(id)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            //url: 'https://talentservicesprofile20201113.azurewebsites.net/profile/profile/updateTalentProfile',
            url: 'http://localhost:60290/profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",

            data: JSON.stringify(id),
            success: function (res) {
                this.loadData()
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Experience deleted", "success", null, null)
                } else {
                    TalentUtil.notification.show("Experience deleted fail", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
            }
        })
    }

    setDate(date) {
        var dt = new Date(date);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        var formattedDate = dt.getDate() + "th " + months[dt.getMonth()] + " " + dt.getFullYear()
        return formattedDate;
    }

    render() {
        return (
            this.renderDisplay()
        )
    }

    renderDisplay() {
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <form class="ui form languages">
                        <div class="form-wrapper">
                            {(!this.state.IsEditMode) && this.state.showEditSection && <div class="fields">
                                <div class="workexperiencefield">

                                    <div className="companyfield">
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Company:"
                                            name="company"
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            placeholder="Company"
                                        />
                                    </div>
                                    <div className="positionfield">
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Position:"
                                            name="position"

                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            placeholder="Position"
                                        />
                                    </div>

                                    <div className="companyfield" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                        <SingleInput
                                            inputType="date"
                                            label="Start Date:"
                                            name="start"
                                            controlFunc={this.handleChange}
                                        />
                                    </div>
                                    <div className="positionfield">
                                        <SingleInput
                                            inputType="date"
                                            label="End Date:"
                                            name="end"
                                            controlFunc={this.handleChange}
                                        />
                                    </div>
                                    <div style={{ paddingBottom: "10px" }}>
                                        <ChildSingleInput
                                            inputType="text"
                                            label="Responsibilities:"
                                            name="responsibilities"
                                            controlFunc={this.handleChange}
                                            maxLength={80}
                                            placeholder="Responsibilities"

                                        />
                                    </div>
                                    <button type="button" className="ui teal button" onClick={this.addExperience}>Add</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div>}
                            <table class="ui fixed table">
                                <thead>
                                    <tr>
                                        <th>Company</th>
                                        <th>Position</th>
                                        <th>Responsibilities</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th class="right aligned">
                                            <div class="button" class="ui teal button " onClick={this.openEdit}><i class="plus square"></i>+ Add New</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.experiences.map((experience) => {
                                        return (
                                            this.state.IsEditMode && this.state.rowkey === experience.id ? (
                                                <tr key={experience.id}>
                                                    <td colspan="6">
                                                        <div class="fields">
                                                            <div class="workexperiencefield">
                                                                <div className="companyfield">
                                                                    <ChildSingleInput
                                                                        inputType="text"
                                                                        label="Company:"
                                                                        name="company"
                                                                        defaultValue={experience.company}
                                                                        controlFunc={this.handleChange}
                                                                        maxLength={80}
                                                                    />
                                                                </div>
                                                                <div className="positionfield">
                                                                    <ChildSingleInput
                                                                        inputType="text"
                                                                        label="Position:"
                                                                        name="position"
                                                                        defaultValue={experience.position}
                                                                        controlFunc={this.handleChange}
                                                                        maxLength={80}
                                                                    />
                                                                </div>
                                                                <div className="companyfield" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                                                    <SingleInput
                                                                        inputType="date"
                                                                        label="Start Date:"
                                                                        name="start"
                                                                        defaultValue={(experience.start).slice(0, 10)}
                                                                        controlFunc={this.handleChange}
                                                                    />
                                                                </div>
                                                                <div className="positionfield">
                                                                    <SingleInput
                                                                        inputType="date"
                                                                        label="End Date:"
                                                                        name="end"
                                                                        defaultValue={(experience.start).slice(0, 10)}
                                                                        controlFunc={this.handleChange}
                                                                    />
                                                                </div>
                                                                <div style={{ paddingBottom: "10px" }}>
                                                                    <ChildSingleInput
                                                                        inputType="text"
                                                                        label="Responsibilities:"
                                                                        name="responsibilities"
                                                                        defaultValue={experience.responsibilities}
                                                                        controlFunc={this.handleChange}
                                                                        maxLength={80}
                                                                    />
                                                                </div>
                                                                <button type="button" className="ui teal button" onClick={this.updateExperience}>Update</button>
                                                                <button type="button" className="ui button" onClick={this.onClose}>Cancel</button>

                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) :
                                                <tr>
                                                    <td>{experience.company}</td>
                                                    <td>{experience.position}</td>
                                                    <td>{experience.responsibilities}</td>
                                                    <td>{this.setDate(experience.start)}</td>
                                                    <td>{this.setDate(experience.end)}</td>
                                                    <td>
                                                        <div class="right aligned">
                                                            <span class="button" onClick={() => this.onEdit(experience.id, experience.company, experience.position, experience.responsibilities, experience.start, experience.end)}><i class="outline write icon"></i></span>
                                                            <span class="button" ><i class="remove icon" onClick={() => this.deleteExperience(experience.id)}></i></span>
                                                        </div>
                                                    </td>
                                                </tr>

                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}