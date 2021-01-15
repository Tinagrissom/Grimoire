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

  updatedEntry = (event) => {
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
        dat: '',
        image: '',
        description: '',
      })
    })
  }

  render = () => {
    return (
      <div>
        <h3>A collection of dreams, crystals, and, incantations to inspire.</h3>
      </div>
    )
  }

}

ReactDOM.render(<App></App>, document.querySelector('main'))
