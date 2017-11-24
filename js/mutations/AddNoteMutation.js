import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation AddNoteMutation($input: AddNoteInput!) {
    addNote(input: $input) {
      noteEdge {
        cursor
        node {
          id
          text
        }
      }
    }
  }
`;

export const commit = (env, text) => {
  return commitMutation(env, {
    variables: {
      input: {
        text,
      },
    },
    mutation,
    updater: (store) => {
      const payload = store.getRootField('addNote');
      const newEdge = payload.getLinkedRecord('noteEdge');
      ConnectionHandler.
    },
  });
};
