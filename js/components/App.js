import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello {this.props.viewer.id}
        <ul>
          {this.props.viewer.sites.edges.map(({node: { id, code, name }}) => (
            <li key={id}>{code} ^-^ {name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default createFragmentContainer(App, graphql`
  fragment App_viewer on User {
    id
    sites {
      edges {
        node {
          id
          code
          name
        }
      }
    }
  }
`);
