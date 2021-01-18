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
            <p>The term “grimoire” is a bit of a catch-all. There are few really concrete and consistent definitions that go beyond “a book of magic”. Some people say it’s more of a textbook, meant to be passed on to a mentee as a teaching tool. Others say it’s a sort of magical recipe book, used for recording spells for later use. Most of these definitions are far too limited in scope for the reality of modern grimoires.
            <br />
            <br />
            In reality, the grimoire is as varied a tool as every other part of the craft. Each witch will have their own version of what a grimoire is and they will construct theirs accordingly. This is a wonderful thing! Like any tool in the craft, grimoires must first be useful to us. There’s no point in having a fancy manuscript stuffed full of information that you never use.
            <br />
            <br />
            Grimoires are a witch's right-hand tool, and making one can seem a little daunting at first. Don't feel overwhelmed. Have fun with it! Take the time to really make it yours. No matter what sort of witchcraft you practice, yours will be your best friend. Fill it with spells you like, or witchy information on different herbs, roots and other flora.
            <br />
            <br />
            Astrology-minded witches can use their grimoires to remember all minute complexities of astrology, and those who work with crystals can use theirs as a quick reference guide to crystals, fossils and stones, and all their witchy applications. You can use it to log dreams or thoughts. Or even to write down events like in a journal. Just remember: there is no right or wrong way to make a grimoire.
            </p>
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
        <h2 className="recent" >Recent Entries</h2>
          <ul>
            <div className="row">
                {this.state.entries.map((entries) => {
                  return (
                    <div className="card">
                      <li key={entries._id}>
                        <h2 id="title">{entries.type}</h2>
                        <img src={entries.image} />
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
