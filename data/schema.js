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
  Site,
  User,
  getUser,
  getSite,
  getAllSites,
} from './database';

const { nodeField, nodeInterface } = nodeDefinitions((globalId, ctx) => {
  const { type, id } = fromGlobalId(globalId);
  if (type == 'Note') {
    return getSite(id);
  } else if (type == 'User') {
    return getUser();
  }
  return null;
}, (obj, ctx) => {
  if (obj instanceof Site) {
    return GraphQLSite;
  } else if (obj instanceof User) {
    return GraphQLUser;
  }
  return null;
});

const GraphQLSite = new GraphQLObjectType({
  name: 'Site',
  fields: {
    id: globalIdField('Site'),
    code: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    lastUpdate: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
  },
  interfaces: [nodeInterface],
});

const { connectionType: SiteConnection, edgeType: SiteEdge } = connectionDefinitions({
  name: 'Site',
  nodeType: GraphQLSite,
});

const GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    sites: {
      type: SiteConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getAllSites(), args),
    },
  },
  interfaces: [nodeInterface],
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getUser(),
    },
    node: nodeField,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Our mutation object',
  fields: {
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  // mutation: Mutation,
});
