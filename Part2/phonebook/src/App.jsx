import { useState } from 'react'

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

const Numbers = ({ persons, filter }) => {
    return(
        <div>
            <h2>Numbers</h2>
            {persons.map(person => (
                person.name.toLowerCase().includes(filter.toLowerCase()) 
                   ? <div key={person.name}>
                      {person.name} {person.number}
                   </div>
                   : null
            ))}
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {    
      event.preventDefault()    
      
      if (persons.some(e => e.name === newName)) {
          alert(` ${newName} is already added to the phonebook`)
      } else {
          const nameObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
          }  

          setPersons(persons.concat(nameObject))
          setNewName('')
          setNewNumber('')
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
      <Numbers persons = {persons} filter = {filter}/>
    </div>
  )
}

export default App