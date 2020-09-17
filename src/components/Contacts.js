import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllContacts, deleteContact } from "../actions/contactActions";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import "../styles/loader.css";
import EnhancedTable from "./common/table";
import AlertDialogSlide from "./common/deleteModel";
class ContactsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      errors: {},
      modelOpen: false,
    };
  }

  componentDidMount() {
    this.props.getAllContacts();
    setTimeout(() => {
      this.setState({ contacts: this.props.contact.contacts });
    }, 2000);
  }
  componentWillUnmount() {
    this.setState({contacts: []})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.contacts) {
      this.setState({ contacts: nextProps.contacts });
    }
  }

  render() {
    const { errors } = this.state;
    let { contacts, loading } = this.props.contact;

    const searchNameHandler = (e) => {
      let updatedContacts = contacts.filter((contact) => {
        return contact.name.startsWith(e.target.value);
      });
      this.setState({ contacts: updatedContacts });
    };

    const deleteHandler = async (id ) => {
      await this.props.deleteContact(id, this.props.history);
      this.props.getAllContacts();
      setTimeout(() => {
        this.setState({ contacts:this.props.contact.contacts})
      }, 2000);
    };

    const handleFilter = (location) => {
      if (location === "Clear Fliter") {
        this.setState({ contacts: contacts });
      } else {
        let updatedContacts = contacts.filter((contact) => {
          return contact.location === location;
        });
        this.setState({ contacts: updatedContacts });
      }
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    const handleClickOpen = () => {
      this.setState({ modelOpen: true });
    };

    const handleClose = () => {
      this.setState({ modelOpen: false });
    };
    const deleteModel = (
      <>
        <Dialog
          open={this.state.modelOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure? Do you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              No
            </Button>
            <Button onClick={handleClose} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );

    return (
      <>
        {!errors.nocontactsfound ? (
          <Container maxWidth="xl">
            {!loading ? (
              <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                {deleteModel}
                <EnhancedTable
                  contacts={this.state.contacts}
                  allContacts={this.props.contact.contacts}
                  onSearch={searchNameHandler}
                  onDelete={deleteHandler}
                  handleFilter={handleFilter.bind(this)}
                />
              </div>
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

ContactsComponent.propTypes = {
  getAllContacts: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  contact: state.contact,
});
export default connect(mapStateToProps, { getAllContacts, deleteContact })(
  ContactsComponent
);
