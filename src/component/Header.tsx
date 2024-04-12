import React from 'react';
import { Container, Text } from '@mantine/core';
import '../App.css'; 

const Header = () => {
  return (
    <header className="header">
      <Container size="sm">
        <Text variant="h1" className="title">
          Manufac Analytics
        </Text>
      </Container>
    </header>
  );
}

export default Header;
