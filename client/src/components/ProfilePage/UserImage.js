import React from 'react';

const IMAGE_TYPES = ['image/png', 'image/gif', 'image/jpeg'];
const ERROR = 'The files must be less than 2MB and .png, .gif, .jpeg';

class UserImage extends React.Component {
  state = {
    image: null,
    showError: false
  };

  onChange = e => {
    const file = e.target.files[0];
    const isTypeValid = IMAGE_TYPES.includes(file.type);
    const isSizeValid = file.size / 1024 / 1024 <= 2; // Less than 2MB

    // Check if the form has error
    if ((!isTypeValid, !isSizeValid)) this.setState({ showError: true });

    if ((isTypeValid, isSizeValid)) {
      fetch(`admin/image-upload`, {
        method: 'POST',
        body: file
      })
        .then(res => res.json())
        .catch(err => console.log(err));

      console.log('Data Send', file);
    }
  };

  render() {
    return (
      <div>
        <button onClick={() => this.fileInput.click()}>
          <img src='#' alt='avatar' />
        </button>
        <input
          type='file'
          onChange={this.onChange}
          style={{ display: 'none' }}
          ref={fileInput => (this.fileInput = fileInput)}
        />
        {this.state.showError ? <span>{ERROR}</span> : null}
      </div>
    );
  }
}

export default UserImage;
