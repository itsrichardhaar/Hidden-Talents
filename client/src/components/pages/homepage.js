import React, { Component } from "react";
import axios from "axios";
import * as Elements from "../elements";
import userCheck from "../utils/utilities";
import Categorycard from "../elements/categoryCard";
import { Grid, Form, Image, Button, Icon, Container, Header } from "semantic-ui-react";
import API from "../utils/API";
import * as Images from "../images";
import { resolve } from "url";

const categoryNames = ["Tutoring", "Home Improvement", "Web Development"];
// const categoryDescriptions = ['description', 'description', 'description'];

//User verify==========
class Homepage extends Component {
  constructor() {
    super();
    this.verifyUserSession = this.verifyUserSession.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchMaps = this.searchMaps.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.state = {
      loggedIn: null
    };
  }
  async verifyUserSession() {
    const userObj = await userCheck();
    this.setState({
      loggedIn: userObj.loggedIn,
      user: userObj.user
    });
  }

  //API================
  componentDidMount() {
    this.verifyUserSession();
  }

  async verifyUserSession() {
    const userObj = await userCheck();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }

  searchMaps = query => {
    API.search(query)
      .then(res => {
        this.onSearch(res);
      })
      .catch(err => console.log(err));
  };

  // selectCategory() {
  //   this.setState({
  // When you click on a category, this activates and sets the search parameters
  //   })
  // }

  //Second part of the Call============
  onSearch(zipcodeArray) {
    console.log(zipcodeArray);
    axios
      .post("/search", {
        zipcodes: zipcodeArray
      })
      .then(response => {

        const promise = new Promise((resolve, reject) => {
          this.setState({
            results: response
          });
          resolve();
        })
        promise.then(() => {
          this.setState({
            resultsIn: true
          })
        })
        console.log(this.state.results.data);

      });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    this.searchMaps(this.state.zipcode);
  };

  render() {
    let results
    if (this.state.resultsIn) {
      results = this.state.results.data.map((object, index) => {
        return (
          <Grid.Row>
            <Elements.SearchItem name={object.name} talent={object.talent} talent={object.talent} contact={object.email} bio={object.bio} >  </Elements.SearchItem>
          </Grid.Row>
        )
      })

    } else {
      results = <p>Search results go here</p>
    }

    return (
      <div id='columnContainer'>
        <br />
        <br />

        <Container textAlign='center' id='title' >
          .HIDDEN TALENTS.
        </Container>

        <br />
        <br />

        <Grid centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Image style={{ 'height': 200 }} src={Images.E} className='image' rounded />
              <Button animated
                id='btn1'
                attached='bottom'
                onClick={this.handleClick}
                onKeyPress={this.handleKeyPress}>
                <Button.Content visible>Tutoring</Button.Content>
                <Button.Content hidden>
                  <Icon name='circle outline' />
                </Button.Content>
              </Button>

            </Grid.Column>
            <Grid.Column width={4}>
              <Image style={{ 'height': 200 }} src={Images.A} className='image' rounded />
              <Button animated
                id='btn2'
                attached="bottom"
                onClick={this.handleClick}
                onKeyPress={this.handleKeyPress}
              >
                <Button.Content visible>Home Improvement</Button.Content>
                <Button.Content hidden>
                  <Icon name='circle outline' />
                </Button.Content>
              </Button>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image style={{ 'height': 200 }} src={Images.C} className='image' rounded />
              <Button animated
                id='btn3'
                attached="bottom"
                onClick={this.handleClick}
                onKeyPress={this.handleKeyPress}>
                <Button.Content visible>Web Development</Button.Content>
                <Button.Content hidden>
                  <Icon name='circle outline' />
                </Button.Content>
              </Button>

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Form>
              <Elements.SearchForm
                search={this.state.zipcode}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleChange}
              />
            </Form>
          </Grid.Row>
          {results}

        </Grid>
      </div>
    );
  }
}


export default Homepage;

