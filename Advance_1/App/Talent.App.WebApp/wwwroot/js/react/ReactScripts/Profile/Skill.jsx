import React from 'react';
import Cookies from 'js-cookie';
export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const details = props.details
        this.state = {
            showEditSection: false,
            IsEditMode: false,
            rowkey: "",
            skill: {
                currentUserId: "",
                name: "",
                level: "",
                id: ""
            },
            skillData: {
                name: '',
                level: ''
            },
            skills: []
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onClose = this.onClose.bind(this)
        this.addSkill = this.addSkill.bind(this)
        this.updateSkill = this.updateSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.loadData = this.loadData.bind(this)
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
    }

    openEdit() {
        this.setState({
            showEditSection: true,
            skill: { currentUserId: this.props.details.id, name: "", level: "", id: "" }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
            skill: { name: "", level: "", id: "" }
        })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getSkill',
            //url: ' https://talentprofileic.azurewebsites.net/profile/profile/getSkill',
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

    updateWithoutSave(newValues) {
        this.setState({
            skills: newValues
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.skill)
        console.log(event.target.value)
        const names = this.state.skills.map((skill) => skill.name)
        for (var i = 0; i < names.length; i++) {
            if (names[i] !== event.target.value) {
                data[event.target.name] = event.target.value
                this.setState({
                    skill: data
                })
            } else {
                TalentUtil.notification.show("Already Added", "error", null, null)
                this.setState({
                    showEditSection: false,
                    skill: { name: "", level: "", id: "" }
                })
                this.onClose()
            }
        }
    }

    onEdit(rowkey, name, level) {
        console.log("onEdit!!")
        this.setState({
            IsEditMode: true,
            rowkey: rowkey,
            skill: { currentUserId: this.props.details.id, name: name, level: level, id: rowkey }
        })
    }

    onClose() {
        console.log("onClose!!")
        this.setState({
            IsEditMode: false,
            rowkey: "",
            skill: { name: "", level: "", id: "" }
        })
    }

    addSkill() {
        var cookies = Cookies.get('talentAuthToken');
        if (this.state.skill.name !== "" && this.state.skill.level !== "") {
            $.ajax({
                url: 'http://localhost:60290/profile/profile/addSkill',
                //url: ' https://talentprofileic.azurewebsites.net/profile/profile/addSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.skill),
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
            
        } else {
            TalentUtil.notification.show("Please Fill all the Blanks", "error", null, null)
        }
        this.closeEdit()
    }

    updateSkill() {

        var cookies = Cookies.get('talentAuthToken');
        if (this.state.skill.name !== "" && this.state.skill.level !== "") {
            $.ajax({
                url: 'http://localhost:60290/profile/profile/updateSkill',
                //url: ' https://talentprofileic.azurewebsites.net/profile/profile/updateSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.skill),
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
        } else {
            TalentUtil.notification.show("Please Fill all the Blanks", "error", null, null)
        }
    }


    deleteSkill(id) {
        /*  console.log(id) */
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({

            url: 'http://localhost:60290/profile/profile/DeleteSkill',
            //url: 'https://talentprofileic.azurewebsites.net/profile/profile/DeleteSkill',

            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            // data: {id:id},
            data: JSON.stringify(id),
            success: function (res) {
                this.loadData()
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill deleted", "success", null, null)
                } else {
                    TalentUtil.notification.show("Skill deleted fail", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
            }
        })

    }

    render() {
        return (
            this.renderDisplay()
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <form className="ui form languages">
                        <div className="form-wrapper">
                            {(!this.state.IsEditMode) && this.state.showEditSection && <div class="fields">
                                <div class="five wide field">
                                    <input type="text" placeholder="Add Skill" name="name" onChange={this.handleChange}></input>
                                </div>
                                <div class="five wide field">
                                    <select class="ui dropdown" name="level" onChange={this.handleChange}>
                                        <option value="">Skill Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                                <div class="six wide field">
                                    <input type="button" class="ui teal button" value="Add" onClick={this.addSkill}></input>
                                    <input type="button" class="ui button" value="Cancel" onClick={this.closeEdit}></input>
                                </div>
                            </div>}
                            <table class="ui fixed table">
                                <thead>
                                    <tr>
                                        <th>Skill</th>
                                        <th>Level</th>
                                        <th class="right aligned">
                                            <div class="button" class="ui teal button " onClick={this.openEdit}><i class="plus square"></i>+ Add New</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.skills.map((skill) => {
                                        return (
                                            <tr key={skill.id}>
                                                <td>
                                                    {
                                                        this.state.IsEditMode && this.state.rowkey === skill.id ? (
                                                            <input type="text" defaultValue={skill.name} /* placeholder="Add skill" */ name="name" onChange={this.handleChange} >
                                                            </input>
                                                        ) : (
                                                            skill.name
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        this.state.IsEditMode && this.state.rowkey === skill.id ? (
                                                            <select class="ui dropdown" defaultValue={skill.level} name="level" onChange={this.handleChange}>
                                                                <option value="">Skill Level</option>
                                                                <option value="Beginner">Beginner</option>
                                                                <option value="Intermediate">Intermediate</option>
                                                                <option value="Expert">Expert</option>
                                                            </select>
                                                        ) : (
                                                            skill.level
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        this.state.IsEditMode && this.state.rowkey === skill.id ? (
                                                            <span class="buttons-wrapper">
                                                                <input type="button" class="ui blue basic button" value="Update" onClick={() => this.updateSkill(skill.id)}></input>
                                                                <input type="button" class="ui red basic button" value="Cancel" onClick={this.onClose}></input>
                                                            </span>
                                                        ) : (
                                                            <div class="right aligned">
                                                                <span class="button" onClick={() => this.onEdit(skill.id, skill.name, skill.level)}><i class="outline write icon"></i></span>
                                                                <span class="button" onClick={() => this.deleteSkill(skill.id)}><i class="remove icon"></i></span>
                                                            </div>
                                                        )
                                                    }
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