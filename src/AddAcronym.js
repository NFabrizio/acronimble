import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import { ListItemText } from 'material-ui/List';

class AddAcronym extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: true,
      categories: [],
      selected: [],
      acronym: '',
      name: '',
      definition: ''
    };
  }

  componentDidMount() {
    axios.get('/categories')
      .then((res) => {
        this.setState({
          loading: false,
          categories: res.data || []
        });
      });
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  };

  handleSelect(event) {
    this.setState({ selected: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault && e.preventDefault();

    if (!this.state.name || !this.state.definition || !this.state.acronym) {
      return;
    }

    this.setState({
      submitting: true
    });

    axios.post('/acronyms', {
      acronym: this.state.acronym,
      definitions: [{
        name: this.state.name,
        description: this.state.definition,
        categories: this.state.selected
      }]
    }, {
      headers: {
        Authorization: `Bearer ${this.props.auth.getAccessToken()}`
      }
    }).then((res) => {
      this.props.history.push(`/acronyms/${res._id}`);
    });
  }

  render() {
    if (this.state.loading) {
      return 'Loading...';
    };

    return (
      <form className="new-acronym-form" autoComplete="off">
        <TextField
          id="acronym"
          label="Acronym"
          value={this.state.acronym}
          onChange={this.handleChange('acronym')}
          margin="normal"
        />
        <TextField
          id="name"
          label="Name"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="definition"
          label="Definition"
          value={this.state.definition}
          onChange={this.handleChange('definition')}
          margin="normal"
          multiline
        />
        <FormControl>
          <InputLabel htmlFor="select-multiple-checkbox">Categories</InputLabel>
          <Select
            multiple
            value={this.state.selected}
            onChange={this.handleSelect}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
          >
            {this.state.categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                <Checkbox checked={this.state.selected.indexOf(category._id) > -1} />
                <ListItemText primary={category.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="form-actions">
          <Button
            variant="raised"
            color="secondary"
            onClick={() => this.props.history.goBack()}
          >
            Cancel
          </Button>
          <Button
            variant="raised"
            color="primary"
            disabled={this.state.submitting}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

export default withRouter(AddAcronym);