import React, { Component } from "react";
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {
  postContact,
  getContactById,
  updateContact,
} from "../actions/contactActions";
import { connect } from "react-redux";
import "../styles/contacts.css";
import "../styles/loader.css";
import { Link, withRouter } from "react-router-dom";
class AddEditContactsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.match.params.type,
      errors: {},
      contact: {},
      name: "",
      number: "",
      location: "",
      details: {
        ICC: 0,
        OCC: 0,
      },
    };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.setState({type:this.props.match.params.type})
    if (this.state.type !== "create") {
      this.props.getContactById(this.state.type);
      setTimeout(() => {
        this.setState({ contact: this.props.contact.contact });
      }, 2000);
    }
  }
  componentWillUnmount() {
    this.setState({})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.contact) {
      this.setState({ contact: nextProps.contact });
    }
  }
  submitHandler(e) {
    e.preventDefault();
    let content = (this.state.type !== "create") ? this.state.contact : {
      name: this.state.name,
      number:this.state.number,
      location: this.state.location,
      details: this.state.details
    }
    let contact = {
      ...content
    };
    if (this.state.type !== "create") {
      this.props.updateContact(this.state.type, contact, this.props.history);
    } else {
      this.props.postContact(contact, this.props.history);
    }
  }
  onChange(event) {
    if(this.state.type !== "create") {
      let dupContact = this.state.contact;
      dupContact[event.target.name]=event.target.value;
      this.setState({contacts : dupContact});
    }
    else {
    this.setState({ [event.target.name]: event.target.value });
    }
  }
  render() {
    let { contact, loading } = this.props.contact;
    const { errors } = this.state;
    return (
      <>
        <Card color="primary" style={{ padding: "20px" }}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={10}>
              <h3 style={{ display: "inline-block" }}>
                {this.state.type === "create" ? "Create" : "Update"} Contact
              </h3>
            </Grid>
            <Grid item xs>
              <Link to="/contacts">
                <Button variant="outlined" color="primary">
                  Back to contacts
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Card>
        {!errors.nocontactsfound ? (
          <Container maxWidth="xl" style={{ margin: "1% auto" }}>
            {!loading ? (
              <Card style={{ padding: "10px" }}>
                <form
                  onSubmit={this.submitHandler}
                  noValidate
                  autoComplete="off"
                >
                  <div className="contact-input">
                    <TextField
                      required
                      fullWidth
                      name="name"
                      id="outlined-required"
                      label="Name"
                      onChange={this.onChange}
                      defaultValue={(this.state.type !== "create") ? contact.name : ''}
                      variant="outlined"
                    />
                  </div>
                  <div className="contact-input">
                    <TextField
                      required
                      fullWidth
                      id="outlined-required"
                      name="number"
                      label="Number"
                      onChange={this.onChange}
                      defaultValue={(this.state.type !== "create") ? contact.number : ''}
                      variant="outlined"
                    />
                  </div>
                  <div className="contact-input">
                    <TextField
                      fullWidth
                      id="outlined-required"
                      name="location"
                      label="Location"
                      onChange={this.onChange}
                      defaultValue={(this.state.type !== "create") ? contact.location : ''}
                      variant="outlined"
                    />
                  </div>
                  <div className="btn-create">
                    <Button type="submit" variant="contained" color="primary">
                      {this.state.type === "create" ? "Create" : "Update"}
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <div className="loading">
                <CircularProgress />
              </div>
            )}
          </Container>
        ) : (
          <div>
            <h3>Something went wrong</h3>
          </div>
        )}
      </>
    );
  }
}
AddEditContactsComponent.propTypes = {
  postContact: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  postContact,
  getContactById,
  updateContact,
})((AddEditContactsComponent));
