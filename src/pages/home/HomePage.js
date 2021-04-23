import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components';
// import User from '../../components/User';

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// const TasksContainer = styled.div`
//   padding-top: 20px;
// `;

// const EmptyTasksPlaceholder = styled.p`
//   color: #edf4ff;
//   text-align: center;
//   font-size: 22px;
// `;

const SignOutIconContainer = styled.div`
  margin-left: 10px;
  
  .signOutIcon {
    fill: #edf4ff;
  }
`;

@inject('usersStore', 'routerStore', 'userStore')
@observer
class HomePage extends Component {

  loadToken() {
    const token = localStorage.getItem('accessToken');
    this._accessToken = token;
    return token;
  }

    handleSignOut = () => {
        const { userStore, usersStore, routerStore } = this.props;
        userStore.signout();
        usersStore.resetUsers();
        routerStore.push('/');
    };

    renderUsers = () => {

    console.log(this.loadToken());

        
            
           if(this.loadToken()==null){
            return <SignOutIconContainer>
              <Fab
              variant="extended"
              onClick={() => this.props.routerStore.push('/signin')}
              >
                <AddIcon />
                SignIn
              </Fab>
              <Fab
              variant="extended"
                  onClick={() => this.props.routerStore.push('/signup')}
              >
                  <AddIcon />
                  SignUp
              </Fab>
            </SignOutIconContainer>
           }
          return <SignOutIconContainer>
          <Fab
          variant="extended"

          onClick={() => this.props.routerStore.push('/manage-user')}
          >
            <AddIcon />
            Get All User
          </Fab>
            <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
            </IconButton>
          </SignOutIconContainer>
          
    };

    render() {
        return (
        <TasksWrapper>
            <TasksHeader>
            <Title>Home Page</Title>

            <CreateButtonContainer>
                
                {this.renderUsers()}

            </CreateButtonContainer>
            </TasksHeader>
        </TasksWrapper>
        );
    }
}

export default HomePage;
