/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        const details = props.details

        this.state = {
            file:null,
            imageSrc:"" ,
            id:details.id
        }
        this.handleChange = this.handleChange.bind(this)
        this.save = this.save.bind(this)
    };

    save(){
        let file=this.state.file
        var formData=new FormData();
        formData.append('body', this.state.file);
       // file.append('myImage',this.state.file);
        // console.log(file)
        // console.log(form)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            
            url: 'http://localhost:60290/profile/profile/updateProfilePhoto',
            //url: ' https://talentprofileic.azurewebsites.net/profile/profile/updateProfilePhoto',
            
            headers: {
                'Authorization': 'Bearer ' + cookies,
                // 'content-type': 'multipart/form-data',
            },
            data: formData,
            cache: false,
           processData: false,
           contentType: false,
            type: "POST",
            //data: JSON.stringify(file),
            success: function (res) {
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

    }

    handleChange(event){
        
        if (event.target.files && event.target.files[0]) {
            let file=event.target.files[0];
            console.log("image source")
            console.log(event.target.result)
            this.setState({
                imageSrc: event.target.result,
                file:file
            });
            let reader = new FileReader();
            reader.onload = (e) => {
              this.setState({
                  imageSrc: e.target.result,
                  
            });
            };
           reader.readAsDataURL(event.target.files[0]);
            
          }

        
    }
    

    render() 
    {
        // console.log(this.props.details.profilePhotoUrl)
        // console.log(this.state.imageSrc)
      //  const image=require.context(this.props.details.profilePhotoUrl,true);
        let showProfileImg;
        if (this.state.imageSrc != "") {
            showProfileImg =
                <div>
                    <img
                        style={{ height: 112, width: 112 }}
                        className="ui small circular image uploader"
                        src={this.state.imageSrc}
                        
                        alt="Image Not Found"
                        onClick={this.handleChange}
                    />
                    {/* <div className="ui teal button" onClick={this.save}>
                        <i className="small upload icon"></i>Upload
                    </div> */}
                    <button type="button" className="ui teal button" onClick={this.save}>Upload</button>  
                </div>;
        } else if (this.props.details.profilePhotoUrl != "" && this.props.details.profilePhotoUrl != undefined) {
            showProfileImg =
                <img
                    style={{ height: 112, width: 112 }}
                    className="ui small circular image uploader"                 
                    src={this.props.details.profilePhotoUrl}          
                    alt="lojjhhhfhfcfg"
                    onClick={this.handleChange}
                />;
        }
        else {
            showProfileImg = <i className="huge circular camera retro link icon uploader" onClick={this.handleChange}></i>;
        }
        return (
                    <section>
                        <div class="image-upload">
                            <label For="file-input" className="profile-photo">
                                {showProfileImg}
                            </label> 
                            <input id="file-input" type="file" style={{ display: 'none' }} onChange={this.handleChange} accept="image/*"/>
                        </div>
                    </section>
        )
    }
        
    
}
