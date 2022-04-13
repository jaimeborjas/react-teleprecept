import React, {Component} from 'react';
// import './App.css';
import axios from 'axios';

class UploadFile extends Component{
    state = {
        selectedFile:null
    }
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
    //   //   axios.post('http://localhost:5000/upload', fd, {
  
    //   //  })
    // .then(res => {
    //     console.log(res);
    // });
    }
    render(){
        return(
            <div className="App">
              <input 
                style={{display: 'none'}}
                type="file"
                onChange={this.fileSelectedHandler}
                ref={fileInput => this.fileInput = fileInput}/>
                <button onClick={() => this.fileInput.click()}>Select File</button>
                <button onClick={this.fileUploadHandler}>Upload</button>
            </div>
        );
    }
}
export default UploadFile;
