import React from 'react';
import styled from 'styled-components';

const placeholder = require('../../img/placeholder.png');

const Image = styled.div`
  img {
    height: 165px;
    margin: 0 0 30px 50px;
    width: auto;
  }
`; 

const IMAGE_TYPES = ['image/png', 'image/gif', 'image/jpeg'];
const ERROR = 'The files must be less than 2MB and .png, .gif, .jpeg';

class UserImage extends React.Component {
  state = {
    showError: false,
    images: []
  };

  //Image Upload
  onChange = e => {
    const files = Array.from(e.target.files)
    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
      console.log(file)
    })
    console.log(formData)
    fetch('/admin/image-upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        images
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    const {images} = this.state;
    return (
      <Image>
        <img onClick={() => this.fileInput.click()} src={images[0]?images[0].url : placeholder} alt='avatar'/>
        <input
          type='file'
          // onChange={this.onChange}
          style={{ display: 'none' }}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        {this.state.showError ? <span>{ERROR}</span> : null}
      </Image>
    );
  }
}

export default UserImage;