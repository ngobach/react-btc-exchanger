import elasticsearch from 'elasticsearch';

const ES_INDEX = 'local-pck-settings';
const ES_TYPE = 'site';

export class User {}
export class Site {}

function siteFromES(raw) {
  return Object.assign(new Site(), {
    id: raw._id,
    code: raw._source.code,
    name: raw._source.name,
    lastUpdate: raw._source.lastUpdate,
    city: raw._source.location && raw._source.location.city || '',
    status: raw._source.status,
  });
}

const defaultUser = Object.assign(new User(), { id: 'bachnx' });
const esClient = new elasticsearch.Client({
  host: '10.16.38.95:9200',
});

export function getUser(id) {
  return defaultUser;
}

export async function getSite(id) {
  const result = await esClient.get({
    index: ES_INDEX,
    type: ES_TYPE,
    id,
  });
  
  return result.found ? siteFromES(result) : null;
}

export async function getAllSites() {
  const result = await esClient.search({
    index: ES_INDEX,
    type: ES_TYPE,
  });
  return result.hits.hits.map(siteFromES);
}
