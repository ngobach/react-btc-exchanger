import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello {this.props.viewer.id}</div>;
  }
}

export default createFragmentContainer(App, graphql`
  fragment App_viewer on User {
    id
  }
`);
