import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Note from './Note';
import { commit as addNoteMutation } from '../mutations/AddNoteMutation';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  
    this._addNote = this._addNote.bind(this);
    this._textChanged = this._textChanged.bind(this);
  }

  _addNote() {
    addNoteMutation(this.props.relay.environment, this.props.viewer.id, this.state.text);
    this.setState({ text: '' });
  }

  _textChanged(e) {
    this.setState({
      text: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Notes
              </h1>
              <h2 className="subtitle">
                Your notebook here
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="items">
              {this.props.viewer.notes.edges.map(({node}) => (
                <Note note={node} key={node.id}/>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <label className="label">New note</label>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  className="input is-fullwidth"
                  type="text"
                  placeholder="Note content"
                  value={this.state.text}
                  onChange={this._textChanged}
                />
              </div>
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={this._addNote}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default createFragmentContainer(NoteApp,
  graphql`
    fragment NoteApp_viewer on User {
      id
      notes(first: 1) @connection(key: "NoteApp_notes") {
        edges {
          node {
            ...Note_note
            id
          }
        }
      }
    }
  `
);
