import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components';
import User from '../../components/User';

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

const TasksContainer = styled.div`
  padding-top: 20px;
`;

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;
  
  .signOutIcon {
    fill: #edf4ff;
  }
`;

@inject('usersStore', 'routerStore', 'userStore')
@observer
class UsersPage extends Component {
  componentDidMount() {
    this.props.usersStore.fetchUsers();
  }
  
  handleSignOut = () => {
    const { userStore, usersStore, routerStore } = this.props;
    userStore.signout();
    usersStore.resetUsers();
    routerStore.push('/signin');
  };

  renderUsers = () => {

    const { usersStore } = this.props;
    console.log(usersStore.usersService.loadToken());
    if(usersStore.usersService.loadToken()==null){
      this.props.routerStore.push('/')
    }
    if (!usersStore.users.length) {
      return <EmptyTasksPlaceholder>No users available. Create one?</EmptyTasksPlaceholder>
    }

    

    return usersStore.users.map(user => (
      <User
        key={user.id}
        id={user.id}
        email={user.email}
        password={user.password}
      />
    ));
  };

  render() {
    return (
      <TasksWrapper>
        <TasksHeader>
          <Title>Get All Users.</Title>

          <CreateButtonContainer>
          <Fab
                 variant="extended"
              
              onClick={() => this.props.routerStore.push('/')}
            >
              <AddIcon />
              Back Home
            </Fab>

            <SignOutIconContainer>
              <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
            
          </CreateButtonContainer>
        </TasksHeader>

        

        <TasksContainer>
          {this.renderUsers()}
        </TasksContainer>
      </TasksWrapper>
    );
  }
}

export default UsersPage;
