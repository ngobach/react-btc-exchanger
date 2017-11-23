import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class NoteApp extends React.Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title">
            My notes
          </h1>
          <p className="subtitle">
            What I should do <b>ASAP</b>.
          </p>
          <div className="items">
            {this.props.notes.edges.map(({node: { text, id }}) => (
              <h4 key={id}><i className="fa fa-eercast" aria-hidden="true"></i> {text}</h4>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default createFragmentContainer(NoteApp, {
  notes: graphql`
    fragment NoteApp_notes on NoteConnection {
      edges {
        node {
          id
          text
        }
      }
    }
  `,
});
