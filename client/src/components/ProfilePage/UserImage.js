import React from 'react';
import { Consumer } from '../../utils/Context';
import makeRequest from '../../utils/makeRequest';
import styled from 'styled-components';

const placeholder = require('../../img/placeholder.png');

const Image = styled.div`
  display: flex;
  justify-content: center;
    img {
      height: 165px;
      width: auto;
    }
`; 

//const IMAGE_TYPES = ['image/png', 'image/gif', 'image/jpeg'];
const ERROR = 'The files must be less than 2MB and .png, .gif, .jpeg';

class UserImage extends React.Component {
  state = {
    showError: false,
  };

  //Image Upload
  onChange = (user, e) => {
    console.log('[Image] user ', e.target)
    const files = Array.from(e.target.files)
    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    makeRequest(`admin/users/${user._id}/uploadImage`, 'POST', formData)
      .then(res => res.json())
      .then(imageUrl => {
        this.setState({ 
          imageUrl
        })
      })
      .catch(err => err);
  }

  render() {
    let {imageUrl} = this.state;
    let imagePreview = null;
    if(imageUrl){
      imagePreview = (<img onChange={this.handleImageChange} onClick={() => this.fileInput.click()} src={imagePreview} alt ='avatar'/>);
    } else {
      imagePreview = (<img onChange={this.handleImageChange} onClick={() => this.fileInput.click()} src={placeholder} alt ='avatar'/>)
    }
    return (
      <Consumer> 
      {user => (
      <Image className='userImage'>
        {imagePreview}
        <input
          type='file'
          onChange={(e) => this.onChange(user, e)}
          style={{ display: 'none' }}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        {this.state.showError ? <span>{ERROR}</span> : null}
      </Image>
      )}
      </Consumer>
    );
  }
}

export default UserImage;