import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

import './SignInPage.scss';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
`;


const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject('userStore', 'routerStore')
class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMesssage: null,
    };
  }

  submit = async () => {
    this.setState({ errorMessage: null });
    const { email, password } = this.state;

    try {
      await this.props.userStore.signin(email, password);
      this.props.routerStore.push('/');
    } catch (error) {
      if(error.response){
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        this.setState({ errorMessage });
      }else{
        
        console.error("could not connect to the server");
      }
    }
  };

  goToSignUp = () => {
    this.props.routerStore.push('/signup')
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Hello!</Heading>
          <p>Fill in your email and password to sign in.</p>
          
          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Email"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <hr/>
          <div>
            <Button
              style={{ marginBottom: '10px' }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN IN
            </Button>

            <Button fullWidth onClick={this.goToSignUp}>
              Don't have an account? Sign up now!
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignInPage;
