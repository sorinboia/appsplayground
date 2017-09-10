import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import './multipleFileUpload.css';
import axios from 'axios';

class MultipleFileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles:0,
      messageOpen:false,
      message: '',
    };
  }


  handleSubmit = (event) => {
    this.setState({messageOpen:false,message:''});
    event.preventDefault();
    // Need to check for a better way to get the formdata
    const formData =  new FormData(document.querySelector("form"));
    axios({
      method: 'post',
      url: '/api/upload',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'}
    }).then((response) => {
      this.setState({messageOpen:true,message:'Upload successful'});
    }).catch((response) => {
      this.setState({messageOpen: true, message: 'Upload failed'});
    });
  };

  render() {
    return (
      <div className="divWrapper">
        <form action="/api/upload" method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <TextField name="directory" fullWidth={true} inputStyle={{textAlign:'center'}}/>
          <FlatButton
            label={this.state.selectedFiles ? `${this.state.selectedFiles} files Selected` : "Chose Files"}
            labelPosition="before"
            containerElement="label"
            fullWidth={true}
          >
            <input type="file" name="myfiles" multiple
                   onChange={(event) => {
                     if (event.target.files.length > 0) {
                       this.setState({selectedFiles:event.target.files.length});
                     }
                   }}
            />
          </FlatButton>
          <br />
          <FlatButton
            type="submit"
            label="Upload"
            labelPosition="before"
            primary={true}
            fullWidth={true}
            disabled={this.state.selectedFiles ? false : true}
          />

        </form>
        <Snackbar
          open={this.state.messageOpen}
          message={this.state.message}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}

export default MultipleFileUpload;