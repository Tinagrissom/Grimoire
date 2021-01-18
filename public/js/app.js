class App extends React.Component {

  state = {
    type: '',
    date: '',
    image: '',
    description: '',
    show: false,
    card: false,
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

  showModal = () => {
    event.preventDefault();
    this.setState({
      show: !this.state.show
    })
  }

  closeModal = () => {
    event.preventDefault();
    this.setState({
      show: !this.state.show
    })
  }

  showEntry = () => {
    event.preventDefault();
    this.setState({
      show: !this.state.card
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
        <button type="button" id="open" onClick={this.showModal}>About</button>
        {this.state.show === true ?
        <div id="modal">
          <div id="modal-text">
            <h2>About Grimoires, About the Creators</h2>
            <p>This info here</p>
            <button type="button" id="close" onClick={this.closeModal}>Close</button>
          </div>
        </div>
      : '' }
        <h3>A collection of dreams, crystals, and, incantations to inspire.</h3>
          <form onSubmit ={this.handleSubmit}>
            <h2>Add New Entry</h2>
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
              <br />
              <br />
          </form>
        <h2>Recent Entries</h2>
          <ul>
            <div className="row">
                {this.state.entries.map((entries) => {
                  return (
                    <div className="card">
                      <li key={entries._id}>
                        <h2 id="title">{entries.type}</h2>
                        <a>
                        <img src={entries.image} onClick={this.showEntry} />
                        </a>
                        <br />
                        <p>{entries.description}</p>
                        <details>
                        <summary>Edit</summary>
                          <form id={entries._id} onSubmit={this.updateEntry}>
                            <label htmlFor="type">Type</label>
                            <br />
                            <input type="text" id="type" onChange={this.handleChanges} />
                            <br />
                            <label htmlFor="date">Date</label>
                            <br />
                            <input type="text" id="date" onChange={this.handleChanges} />
                            <br />
                            <label htmlFor="image">Image</label>
                            <br />
                            <input type="text" id="image" onChange={this.handleChanges} />
                            <br />
                            <label htmlFor="description">Description</label>
                            <br />
                            <input type="text" id="description" onChange={this.handleChanges} />
                            <br />
                            <input type="submit" value="Update" />
                          </form>
                        </details>
                        <button value={entries._id} onClick={this.deleteEntry}>Delete</button>
                        <button type="button" id="open" onClick={this.showEntry}>Show Entry</button>
                      </li>
                      {this.state.card === true ?
                      <div id="show-card">
                      <ul>
                        <li key={entries._id}>
                          <h2 id="title">{entries.type}</h2>
                          <img src={entries.image} />
                          <br />
                          <p>{entries.description}</p>
                        </li>
                        </ul>
                      </div>
                    : '' }
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
