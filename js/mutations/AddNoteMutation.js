import { commitMutation, graphql } from 'react-relay';

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

export default (env, viewerId, text) => {
  return commitMutation(env, {
    variables: {
      input: {
        text,
      },
    },
    mutation,
    configs: [
      {
        type: 'RANGE_ADD',
        parentID: viewerId,
        connectionInfo: [{
          key: 'NoteApp_notes',
          rangeBehavior: 'append',
        }],
        edgeName: 'noteEdge',        
      },
    ],
  });
};
