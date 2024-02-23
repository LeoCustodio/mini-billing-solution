import React, { useState } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

function LoginForm ()  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      await fetch('http://localhost:8002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }).then(response => {
        if(response.ok){
          response.json().then(json => {
            localStorage.setItem('Authorization', json.token);
            setRedirect(true);
          })
        }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  return(
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='https://dev.pro/wp-content/themes/dev.pro-website/assets/src/img/header/top-bar-menu/logo.svg' /> Log-in Mini-Billing account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='User Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
  
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );

}




export default LoginForm