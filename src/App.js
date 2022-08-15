import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {
    contactsList: initialContactsList,
    name: '',
    mobileNo: '',
    isName: false,
    isNumber: false,
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    const newContact = {
      id: uuidv4(),
      name,
      mobileNo,
      isFavorite: false,
    }
    if (name !== '' && mobileNo !== '') {
      this.setState(prevState => ({
        contactsList: [...prevState.contactsList, newContact],
        name: '',
        mobileNo: '',
      }))
    }

    if (name === '') {
      this.setState(prevState => ({isName: !prevState.isName}))
    }
    if (mobileNo === '') {
      this.setState(prevState => ({isNumber: !prevState.isNumber}))
    }
  }

  onTriggerFavorite = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onChangeMobileNo = event => {
    const {mobileNo} = this.state
    this.setState({mobileNo: event.target.value})
    if (mobileNo === '') {
      this.setState({isNumber: false})
    }
  }

  onChangeName = event => {
    const {name} = this.state
    this.setState({name: event.target.value})
    if (name === '') {
      this.setState({isName: false})
    }
  }

  render() {
    const {name, mobileNo, contactsList, isName, isNumber} = this.state

    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <div className="input-section">
              <input
                value={name}
                onChange={this.onChangeName}
                className="input"
                placeholder="Name"
                id="name"
              />
              <br />
              {isName && (
                <span htmlFor="name" className="require-msg">
                  Please enter the name*
                </span>
              )}
            </div>

            <div className="input-section">
              <input
                className="input"
                value={mobileNo}
                onChange={this.onChangeMobileNo}
                placeholder="Mobile Number"
              />
              <br />
              {isNumber && (
                <span htmlFor="name" className="require-msg">
                  Please enter the mobile number*
                </span>
              )}
            </div>

            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">Mobile Number</p>
            </li>

            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                onTriggerFavorite={this.onTriggerFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
