import React from 'react';
import Input from '../UI/Form/Input';
import Select from '../UI/Form/Select';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Button from '../UI/Generic/Button'

/** [H] I Need to make this match with current BE*/
const SELECT_OPTIONS = {
  updates: 'Updates Only',
  premium: 'Full Access'
};

/** [H] I Need to make this match with current BE*/
const initialState = {
  accessType: 'Updates Only',
  fullName: 'Irina',
  userName: 'irishka2863',
  userEmail: 'irishka2863@yahoo.com',
  psw: '123456',
  confirmPassword: '123456',
  showErrors: false
};

const UsersForm = class userInput extends React.Component {
  state = initialState;

  handleChange = e => {
    const {
      name,
      type,
      value
    } = e.target;

    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: errorFormHandler(type, value, SELECT_OPTIONS)
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    /** [H] I Need to make this match with current BE*/
    const {
      accessType,
      confirmPassword,
      userEmail,
      formErrors,
      fullName,
      psw,
      userName
    } = this.state;
    const dataForm = {
      accessType,
      userEmail,
      fullName,
      psw,
      userName
    };
    const passIsEqual = psw === confirmPassword;
    const isValid = isFormValid(formErrors, dataForm);

    if (!passIsEqual) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          confirmPassword: 'Password must be identical'
        }
      });
    }

    isValid
      ?
      this.handleSendForm(dataForm) :
      this.setState({
        showErrors: true
      });
  };

  handleSendForm = dataForm => {
    const payload = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    };
    /** [H]/api/user is handeling this at the moment */
    fetch('/admin/newuser', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('>> TEST: sending data \n', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  render() {
    const {
      formErrors,
      showErrors
    } = this.state;
    const hasErrors = showErrors && formErrors;

    /** [H] I Need to make this match with current BE*/
    return ( < form className = 'usersForm'
      onSubmit = {
        this.handleSubmit
      } > < Input label = 'Full Name'
      placeholder = 'John Doe'
      name = 'fullName'
      type = 'text'
      onChange = {
        this.handleChange
      }
      value = {
        this.state.fullName
      }
      error = {
        hasErrors ?
        formErrors.fullName : null
      }
      /> < Input label = 'User Id' placeholder = 'john42' name = 'userName' type = 'text' onChange = {
      this.handleChange
    }
    value = {
      this.state.userName
    }
    error = {
      hasErrors ?
      formErrors.userName : null
    }
    /> < Input label = 'Email' placeholder = 'john.doe@mail.com' name = 'userEmail' type = 'email' onChange = {
    this.handleChange
  }
  value = {
    this.state.userEmail
  }
  error = {
    hasErrors ?
    formErrors.userEmail : null
  }
  /> < Input label = 'Password' placeholder = 'Password' name = 'psw' type = 'password' onChange = {
  this.handleChange
}
value = {
  this.state.psw
}
error = {
  hasErrors ?
  formErrors.psw : null
}
/> < Input label = 'Confirm Password' placeholder = 'Confirm Password' name = 'confirmPassword' type = 'password' onChange = {
this.handleChange
}
value = {
  this.state.confirmPassword
}
error = {
  hasErrors ?
  formErrors.confirmPassword : null
}
/> < Select name = 'accessType' options = {
SELECT_OPTIONS
}
label = 'Access Type'
onChange = {
  this.handleChange
}
value = {
  this.state.accessType
}
error = {
hasErrors ?
formErrors.accessType : null
}
/> < Button name = 'Create New User' type = 'submit' / > < /form>
);
}
};

export default UsersForm;