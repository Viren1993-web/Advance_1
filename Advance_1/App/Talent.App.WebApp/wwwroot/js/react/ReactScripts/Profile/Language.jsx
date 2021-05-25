import React from 'react';
import Cookies from 'js-cookie';
export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const details = props.details
        this.state = {
            showEditSection: false,
            IsEditMode: false,
            language: {
                currentUserId: "",
                name: "",
                level: "",
                id: ""
            },
            languageData: {
                name: '',
                level: ''
            },
            languages: []
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onClose = this.onClose.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.loadData = this.loadData.bind(this)
        this.updateWithoutSave = this.updateWithoutSave.bind(this)
    }

    openEdit() {
        this.setState({
            showEditSection: true,
            language: { currentUserId: this.props.details.id, name: "", level: "", id: "" }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false,
            language: { name: "", level: "", id: "" }
        })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
            //url: ' https://talentprofileic.azurewebsites.net/profile/profile/getLanguage',
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
            languages: newValues
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.language)
        console.log(event.target.value)
        const names = this.state.languages.map((language) => language.name)
        for (var i = 0; i < names.length; i++) {
            if (names[i] !== event.target.value) {
                data[event.target.name] = event.target.value
                this.setState({
                    language: data
                })
            } else {
                TalentUtil.notification.show("Already Added", "error", null, null)
                this.setState({
                    showEditSection: false,
                    language: { name: "", level: "", id: "" }
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
            language: { currentUserId: this.props.details.id, name: name, level: level, id: rowkey }
        })
    }

    onClose() {
        console.log("onClose!!")
        this.setState({
            IsEditMode: false,
            rowkey: "",
            language: { name: "", level: "", id: "" }
        })
    }

    addLanguage() {
        var cookies = Cookies.get('talentAuthToken');
        /*  var name = this.state.language.name;
         console.log(name); */

        /* const languages1 = this.state.languages.length
        console.log(languages1)
        const names = this.state.languages.map((language) => language.name) */
        if (this.state.language.name !== "" && this.state.language.level !== "") {
            /*  for (var i = 0; i < names.length; i++) {
                 this.state.languages.map((language) => {
                 if (names[i] !== name) { */

            $.ajax({
                url: 'http://localhost:60290/profile/profile/addLanguage',
                //url: ' https://talentprofileic.azurewebsites.net/profile/profile/addLanguage',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.language),
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

               /*  } else {
                    TalentUtil.notification.show("Already Added", "error", null, null)
                    
                } 
            })

        }  */} else {
            TalentUtil.notification.show("Please fill all Blanks", "error", null, null)
        }
        this.closeEdit()
    }

    updateLanguage() {

        var cookies = Cookies.get('talentAuthToken');
        if (this.state.language.name !== "" && this.state.language.level !== "") {
            $.ajax({
                url: 'http://localhost:60290/profile/profile/updateLanguage',
                //url: ' https://talentprofileic.azurewebsites.net/profile/profile/updateLanguage',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(this.state.language),
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


    deleteLanguage(id) {
        /*  console.log(id) */
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({

            url: 'http://localhost:60290/profile/profile/DeleteLanguage',
            //url: 'https://talentprofileic.azurewebsites.net/profile/profile/DeleteLanguage',

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
                    TalentUtil.notification.show("Lanuage deleted", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language deleted fail", "error", null, null)
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
                                    <input type="text" placeholder="Add Language" name="name" onChange={this.handleChange}></input>
                                </div>
                                <div class="five wide field">
                                    <select class="ui dropdown" name="level" onChange={this.handleChange}>
                                        <option value="">Choose Language Level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native/Bilingual">Native/Bilingual</option>
                                    </select>
                                </div>
                                <div class="six wide field">
                                    <input type="button" class="ui teal button" value="Add" onClick={this.addLanguage}></input>
                                    <input type="button" class="ui button" value="Cancel" onClick={this.closeEdit}></input>
                                </div>
                            </div>}
                            <table class="ui fixed table">
                                <thead>
                                    <tr>
                                        <th>Language</th>
                                        <th>Level</th>
                                        <th class="right aligned">
                                            <div class="button" class="ui teal button " onClick={this.openEdit}><i class="plus square"></i>+ Add New</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.languages.map((language) => {
                                        return (
                                            <tr key={language.id}>
                                                <td>
                                                    {
                                                        this.state.IsEditMode && this.state.rowkey === language.id ? (
                                                            <input type="text" defaultValue={language.name} /* placeholder="Add Language" */ name="name" onChange={this.handleChange} >
                                                            </input>
                                                        ) : (
                                                            language.name
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        this.state.IsEditMode && this.state.rowkey === language.id ? (
                                                            <select class="ui dropdown" defaultValue={language.level} name="level" onChange={this.handleChange}>
                                                                <option value="">Choose Language Level</option>
                                                                <option value="Basic">Basic</option>
                                                                <option value="Conversational">Conversational</option>
                                                                <option value="Fluent">Fluent</option>
                                                                <option value="Native/Bilingual">Native/Bilingual</option>
                                                            </select>
                                                        ) : (
                                                            language.level
                                                        )
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        this.state.IsEditMode && this.state.rowkey === language.id ? (
                                                            <span class="buttons-wrapper">
                                                                <input type="button" class="ui blue basic button" value="Update" onClick={() => this.updateLanguage(language.id)}></input>
                                                                <input type="button" class="ui red basic button" value="Cancel" onClick={this.onClose}></input>
                                                            </span>
                                                        ) : (
                                                            <div class="right aligned">
                                                                <span class="button" onClick={() => this.onEdit(language.id, language.name, language.level)}><i class="outline write icon"></i></span>
                                                                <span class="button" onClick={() => this.deleteLanguage(language.id)}><i class="remove icon"></i></span>
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