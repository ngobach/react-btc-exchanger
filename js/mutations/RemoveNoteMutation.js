import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation RemoveNoteMutation($input: RemoveNoteMutationInput!) {
    removeNote(input: $input) {
      removedNoteId
    }
  }
`;

export default function deleteNoteMutation(environment, viewerId, noteId) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        viewer: viewerId,
        noteId,
      },
    },
    configs: [{
      type: 'RANGE_DELETE',
      parentID: viewerId,
      connectionKeys: [{ key: 'NoteApp_notes' }],
      pathToConnection: ['viewer', 'notes'],
      deletedIDFieldName: 'removedNoteId',
    }],
  });
}
