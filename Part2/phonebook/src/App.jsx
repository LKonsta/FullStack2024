import { useState, useEffect } from 'react'
import personService from './services/persons'

const Header = () => <h2> Phonebook </h2>

const Filter = ({handleFilterChange}) => {
    return(
        <div>
        filter shown with <input onChange={handleFilterChange}/>
        </div>
    )
}

const Form = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
        <div>
            <h2>add a new number</h2>

            <form onSubmit={addPerson}>
                <div>
                  name: <input 
                   value={newName}
                   onChange={handleNameChange}
                   />
                </div>
                <div>
                  number: <input 
                   value={newNumber}
                   onChange={handleNumberChange}
                   />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

const Numbers = ({ persons, filter, removePerson }) => {
    return(
        <div>
            <h2>Numbers</h2>
            {persons.map(person => (
                person.name.toLowerCase().includes(filter.toLowerCase()) 
                    ? <div key={person.name}>
                        {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
                   </div>
                   : null
            ))}
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
        })
    }, [])

  const addPerson = (event) => {    
      event.preventDefault()    
      
      if (persons.some(e => e.name === newName)) {
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
              const changedObject = {
                  name: newName,
                  number: newNumber,
                  id: persons.find(e => e.name ===newName).id,
              }  

              personService
                  .replaceNumber(changedObject, changedObject.id)
                  .then(returnedNote => {
                      setPersons(persons.map(p => p.id !== changedObject.id ? p : returnedNote))
                      setNewName('')
                      setNewNumber('')
                  })
          }
              
      } else {
          const nameObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          }  

          personService
              .create(nameObject)
              .then(returnedNote => {
                  setPersons(persons.concat(returnedNote))
                  setNewName('')
                  setNewNumber('')
              })
      }
  }

    const removePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService
                .remove(person.id)
                .then(() => {
                    setPersons(persons.filter(p => p.id !== person.id))
                })
        }

    }

  const handleNameChange = (event) => {      
      setNewName(event.target.value)  
  }
  const handleNumberChange = (event) => {      
      setNewNumber(event.target.value)  
  }
  const handleFilterChange = (event) => {  
      setFilter(event.target.value)  
  }

  return (
    <div>
      <Header />
      <Filter handleFilterChange = {handleFilterChange} />
      <Form addPerson = {addPerson} 
          newName = {newName} 
          handleNameChange = {handleNameChange} 
          newNumber = {newNumber} 
          handleNumberChange = {handleNumberChange} />
          <Numbers persons={persons} filter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App