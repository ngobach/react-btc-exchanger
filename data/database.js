export class User {}
export class Site {}

const defaultUser = Object.assign(new User(), { id: 'bachnx' });

export function getUser(id) {
  return defaultUser;
}

export function getSite(id) {
  return Object.assign(new Site(), { id: 'some-site' });
}
