import React from 'react';
import styled from 'styled-components';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import Button from '../UI/Generic/Button';
import { parksDB } from '../../dummyDB';

const Container = styled.div`
  h2 {
    display: none;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    h2 {
      display: block;
      font-size: 1.5rem;
      padding: 1rem;
      margin: 1rem 0 -1rem 0;
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  background-color: ${props => props.theme.colors.lightbg};
  height: 40vh;

  .phoneField {
    width: 300px;
    align-self: center;
    padding-bottom: 1rem;
    margin: 20px 0px;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    height: auto;
  }
`;

const initialState = {
  parks: [],
  parkSelected: [],
  phone: '',
  showErrors: false,
  formErrors: false
};

class Subscribe extends React.Component {
  state = initialState;

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

  handleChange = e => {
    const { name, type, value } = e.target;

    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: errorFormHandler(type, value)
      }
    });
  };

  handleAddPark = park => {
    const { parkSelected } = this.state;
    const isSelected = parkSelected.find(el => el._id === park._id);

    if (!isSelected) this.setState({ parkSelected: [...parkSelected, park] });
  };

  handleAddAllPark = () => {
    this.setState({ parkSelected: [...this.state.parks] });
  };

  handleDeletePark = park => {
    this.setState({
      parkSelected: [
        ...this.state.parkSelected.filter(el => el._id !== park._id)
      ]
    });
  };

  handleDeleteAddAllPark = () => {
    this.setState({ parkSelected: [] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { phone, formErrors, parkSelected } = this.state;
    const dataForm = { phone, parkSelected };
    const isValid = isFormValid(formErrors, dataForm);

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = { method: 'POST', body: JSON.stringify(dataForm) };

    fetch('/', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  render() {
    const { formErrors, showErrors } = this.state;
    const hasErrors = showErrors && formErrors;
    return (
      <Container>
        <h2>Subscribe</h2>
        <Form id="subscribe" onSubmit={this.handleSubmit}>
          <SearchPark
            parks={this.state.parks}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />

          <SelectedPark
            parks={this.state.parkSelected}
            deletePark={park => this.handleDeletePark(park)}
            deleteAllParks={this.handleDeleteAddAllPark}
          />

          <div className="phoneField">
            <Input
              label="Phone"
              placeholder="123-456-7890"
              name="phone"
              type="tel"
              onChange={this.handleChange}
              value={this.state.phone}
              error={hasErrors ? formErrors.phone : null}
            />

            <Button name="I want to be informed!" />
          </div>
        </Form>
      </Container>
    );
  }
}

export default Subscribe;
