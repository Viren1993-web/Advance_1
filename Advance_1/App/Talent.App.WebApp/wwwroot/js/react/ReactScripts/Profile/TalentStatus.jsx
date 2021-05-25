import React from 'react'
import { Form, Checkbox,Radio } from 'semantic-ui-react';
import { CheckBox } from '../Form/CheckBox.jsx';
export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const jobSeekingStatus = props.details.jobSeekingStatus ?
            Object.assign({},this.props.details.jobSeekingStatus)
            : {
                status: "",
                availableDate: ""
              }

        this.state = {
            showEditSection: false,
            status: this.props.details.jobSeekingStatus.status,
          jobSeekingStatus: jobSeekingStatus
        }

       this.renderDisplay = this.renderDisplay.bind(this)
       this.handleChange = this.handleChange.bind(this)
       this.saveContact = this.saveContact.bind(this) 
    }

    componentDidUpdate(prevProps) {
        /* console.log("componentDidUpdate") */
        if (this.props.details !== prevProps.details) {
            const details = Object.assign({}, this.props.details)
            this.setState({
                newContact: details,
              //  status:this.props.details.jobSeekingStatus.status
            })
        }
      }

    handleChange(event){
        console.log("handleChange triggered!!")
        console.log(event)

        const data = Object.assign({}, this.state.jobSeekingStatus)
            data["status"] = event
            data["availableDate"] = new Date()
            this.setState({
                jobSeekingStatus: data,
                status:event
            },this.saveContact)
           console.log( this.state.jobSeekingStatus)

    };

    saveContact() {   
        console.log("saveContact called!!")       
       // const data = Object.assign({}, this.state.linkedAccounts)
       const jobSeekingStatus = Object.assign({}, this.state.jobSeekingStatus)

        const data = Object.assign({}, this.props.details)
        data.jobSeekingStatus=jobSeekingStatus

        console.log(data)
        this.props.controlFunc(this.props.componentId, data)
    }

    render() {
        return (
            this.renderDisplay()
        )  
    }
    renderDisplay() { 
        let status = this.props.details.jobSeekingStatus? `: ${(this.props.details.jobSeekingStatus.status)}`:""
     //  let status = this.state.newContact.jobSeekingStatus.status ? `: ${(this.state.newContact.jobSeekingStatus.status)}`:""
        return (
            <div className='row'>
                <div className="ui sixteen wide column job-seeking">
                    <Form>
                    
                    <Form.Field>
                            <b>Current Status{status}</b>
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Actively looking for job'
                                name='radioGroup'
                                value='Activelylookingforob'
                                checked={this.state.status === 'Actively looking for job'}
                                onChange={()=>this.handleChange('Actively looking for job')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Not looking for a job at the moment'
                                name='radioGroup'
                                value='Notlookingforajobatthemoment'
                                checked={this.state.status === 'Not looking for a job at the moment'}
                                onChange={()=>this.handleChange('Not looking for a job at the moment')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='Currently employed but open to offers'
                                name='radioGroup'
                                value='Currentlyemployedbutopentooffers'
                                checked={this.state.status === 'Currently employed but open to offers'}
                                onChange={()=>this.handleChange('Currently employed but open to offers')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                label='will be available on later date'
                                name='radioGroup'
                                value='willbeavailableonlaterdate'
                                checked={this.state.status === 'will be available on later date'}
                                onChange={()=>this.handleChange('will be available on later date')}
                            />
                        </Form.Field>

                    </Form>
                </div>
            </div>
        )
    }
}