<<<<<<< HEAD
import React, { Component } from 'react';
import Plist from './ParksList';
import Items from './Items';

export default class Parks extends Component {
  constructor(props) {
    // and you can tell here that i added props to the component.
    super(props); // It it didn't have any before.
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      items: [],
      parkFilter: [],
      filter: '',
      newPark: ''
    };
  }

  handleInput = e => {
    //generic handleInput handles the change for any input field using the name and the value properties.
    const { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);
    this.setState({
      [name]: value
    });
  };

  addItem = e => {
    e.preventDefault();
    const { newPark } = this.state;
    const newItem = {
      key: Date.now(), //needs to be another input from the user - a parkID
      text: newPark
    };
    if (newItem.text !== '') {
      // .text is a name for the park that came from user's input
      let items = [...this.state.items, newItem]; //concatinates new item object to an array of parks
      items.sort((a, b) => {
        if (a.text < b.text) return -1;
        if (a.text > b.text) return 1;
        return 0;
      });
      this.setState({
        items: items,
        newPark: ''
      });
    }
  };

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      //filter() takes in an array and returns a new array with each item that passed through the true/false function.
      return item.key !== key;
    });
    this.setState({
      items: filteredItems
    });
  };

  handleFilter = e => {
    e.preventDefault();
    const filtered = this.state.items.filter(item => {
      return item.text.includes(this.state.filter);
    }); //needs to filter through items according to the inputed value instead of 'hi'
    this.setState({
      parkFilter: filtered,
      filter: ''
    });
  };

  render() {
    console.log('STATE', this.state);
    return (
      <div>
        <h2>List</h2>
        <Plist
          addItem={this.addItem}
          handleInput={this.handleInput}
          newPark={this.state.newPark}
        />
        <Items entries={this.state.items} deleteItem={this.deleteItem} />

        <h2>Filter</h2>
        <form onSubmit={this.handleFilter}>
          <input
            name='filter'
            value={this.state.filter}
            onChange={this.handleInput}
            type='text'
            id='filter'
            placeholder='Search Parks..'
          />
          <button type='submit'>Search</button>
        </form>
        <Items entries={this.state.parkFilter} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

// PLEASE LOOK AT THE COMMENTS ON MY CODE AND IF YOU CAN EXPLAIN TO ME ABOUT THESE CONCEPTS
// THANK YOU!!!
=======
import React, { Component } from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import { parksDB } from '../../dummyDB';
import Button from '../UI/Generic/Button';

const initialState = {
  parks: [],
  parkSelected: [],
  showErrors: false,
  newPark: '',
  parkId: ''
};

export default class Parks extends Component {
  state = initialState;

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

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

  handleSubmit = e => {
    e.preventDefault();
    const { newPark, parkId, formErrors } = this.state;
    const dataForm = { newPark, parkId };
    const isValid = isFormValid(formErrors, dataForm);

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    };

    fetch('/admin/parks', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  handleFilter = e => {
    e.preventDefault();
    const filtered = this.state.items.filter(item => {
      return item.text.includes(this.state.filter);
    }); //needs to filter through items according to the inputed value instead of 'hi'
    this.setState({
      parkFilter: filtered,
      filter: ''
    });
  };

  render() {
    return (
      <div>
        <h2>List</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='newPark'
            value={this.state.newPark}
            onChange={this.handleChange}
            type='text'
            placeholder='New Park...'
            autoComplete='off'
          />
          <Input
            name='parkId'
            value={this.state.parkId}
            onChange={this.handleChange}
            type='text'
            placeholder='Park Id...'
            autoComplete='off'
          />

          <Button name='Create a new park' type='submit' />
        </form>

        <h2>Filter</h2>
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
      </div>
    );
  }
}
>>>>>>> 46ab335183b596282481ad22bca58f865dbe5a7a
