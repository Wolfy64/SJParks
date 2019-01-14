import React from 'react';
import styled from 'styled-components';

const placeholder = require('../../img/placeholder.png');

const Image = styled.div`
display: flex;
justify-content: center;
width: 100%;
  img {
    height: 165px;
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

    this.handleImageChange = this.handleImageChange.bind(this);

    files.forEach((file, i) => {
      formData.append(i, file)
    })

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

  // onChange = e => {
  //   const file = e.target.files[0];
  //   const isTypeValid = IMAGE_TYPES.includes(file.type);
  //   const isSizeValid = file.size / 1024 / 1024 <= 2; // Less than 2MB

    // Check if the form has error
  //   if ((!isTypeValid, !isSizeValid)) this.setState({ showError: true });

  //   if ((isTypeValid, isSizeValid)) {
  //     fetch(`admin/image-upload`, {
  //       method: 'POST',
  //       body: file
  //     })
  //       .then(res => res.json())
  //       .catch(err => console.log(err));

  //     console.log('Data Send', file);
  //   }
  // };

  render() {
    const {images} = this.state;
    return (
      <Image>
        <img onClick={() => this.fileInput.click()} src={images[0]?images[0].url : placeholder} alt='avatar'/>
        <input
          type='file'
          onChange={this.onChange}
          style={{ display: 'none' }}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        {this.state.showError ? <span>{ERROR}</span> : null}
      </Image>
    );
  }
}

export default UserImage;
