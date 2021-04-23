import React, { Component } from 'react';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

const CardTitle = styled.h1`
  margin: 8px 0;
  font-size: 22px;
`;

@inject('usersStore')
class User extends Component {
  

  render() {
    const {email, password } = this.props;
    console.log({ email, password });
    return (
      <CardContainer>
        <Card>
          <CardContent>
            <CardTitle>{email}</CardTitle>
            {password}
          </CardContent>
        </Card>
      </CardContainer>
    );
  }
}

export default User;
