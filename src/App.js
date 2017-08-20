import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const App = ({ pending, error }) => (
  <Wrapper>
    <div>{pending && 'Pending'}</div>
    <div>{error && 'Error'}</div>
  </Wrapper>
);

const mapStateToProps = (state) => ({
  pending: state.rates.length === 0 && !state.error,
  error: state.error,
});

export default connect()(App);
