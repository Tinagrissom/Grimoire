class App extends React.Component {

  state = {
    type: '',
    date: '',
    image: '',
    description: '',
    entries: [],
  }

  handleChanges = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/entries', this.state).then((response) => {
      console.log(response.data);
      this.setState({ entries: response.data, type: '', date: '', image: '', description: '' })
    })
  }

  deleteEntry = (event) => {
    axios.delete('/entries/' + event.target.value).then((response) => {
      this.setState({
        entries: response.data,
      })
    })
  }

  updateEntry = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/entries/' + id, this.state).then((response) => {
      this.setState({
        entries: response.data,
        type: '',
        date: '',
        image: '',
        description: '',
      })
    })
  }

  componentDidMount = () => {
    axios.get('/entries').then((response) => {
      this.setState({
        entries: response.data,
        type: '',
        date: '',
        image: '',
        description: '',
      })
    })
  }

  render = () => {
    return (
      <div>
        <h3>A collection of dreams, crystals, and, incantations to inspire.</h3>
        <h4>Add new Entry</h4>
          <form onSubmit ={this.handleSubmit}>
              <label htmlFor="type">Type of Entry</label>
              <input type="text" id="type" onChange={this.handleChanges}/>
              <br />
              <label htmlFor="date">Date</label>
              <input type="text" id="date" onChange={this.handleChanges}/>
              <br />
              <label htmlFor="image">Image</label>
              <input type="text" id="image" onChange={this.handleChanges}/>
              <br />
              <label htmlFor="description">Description</label>
              <input type="text" id="description" onChange={this.handleChanges}/>
              <br />
              <input type="submit" value="Add to Entries"/>
          </form>
        <h3>Recent Entries</h3>
          <ul>
            <div>
                {this.state.entries.map((entries) => {
                  return (
                    <div>
                      <li key={entries._id}>
                        {entries.type}
                        <img src={entries.image} />
                        <button value={entries._id} onClick={this.deleteEntry}>Delete</button>
                        <details>
                        <summary>Edit</summary>
                          <form id={entries._id} onSubmit={this.updateEntry}>
                            <label htmlFor="type">Type</label>
                            <br />
                            <input type="text" id="type" onChange={this.handleChanges} />
                            <label htmlFor="date">Date</label>
                            <br />
                            <input type="text" id="date" onChange={this.handleChanges} />
                            <label htmlFor="image">Image</label>
                            <br />
                            <input type="text" id="image" onChange={this.handleChanges} />
                            <label htmlFor="description">Description</label>
                            <br />
                            <input type="text" id="description" onChange={this.handleChanges} />
                            <br />
                            <input type="submit" value="Update" />
                          </form>
                        </details>
                      </li>
                    </div>
                  )
                })}
              </div>
            </ul>
      </div>
    )
  }

}

ReactDOM.render(<App></App>, document.querySelector('main'))
