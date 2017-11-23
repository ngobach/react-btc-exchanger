/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

import {
  Note,
  addNote,
  getNote,
  getAllNotes,
  removeNote,
  updateNote
} from './database';

const { nodeField, nodeInterface } = nodeDefinitions((globalId, ctx) => {
  const { type, id } = fromGlobalId(globalId);
  if (type == 'Note') {
    return getNote(id);
  }

  return null;
}, (obj, ctx) => {
  if (ctx instanceof Note) {
    return GraphQLNote;
  }

  return null;
});

const GraphQLNote = new GraphQLObjectType({
  name: 'Note',
  description: 'The Note object',
  fields: {
    id: globalIdField('Note'),
    text: {
      type: GraphQLString,
      description: 'The content of the note',
      resolve: (obj) => obj.text,
    },
  },
  interfaces: [nodeInterface],
});

const { connectionType: NoteConnection } = connectionDefinitions({
  name: 'Note',
  nodeType: GraphQLNote,
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of liveness',
  fields: {
    notes: {
      type: NoteConnection,
      description: 'All the notes',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getAllNotes(), args),
    },
    node: nodeField,
  },
});

export const schema = new GraphQLSchema({
  query: Query,
});
