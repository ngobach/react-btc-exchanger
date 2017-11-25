let counter = 1995;
let notes = [];
const noteById = {};

export class Note {}
export class User {}

export function addNote(text) {
  const id = `${counter++}`;
  const note = Object.assign(new Note(), {
    id,
    text,
  });
  notes.push(note);
  noteById[id] = note;
  return id;
}

export function removeNote(id) {
  const note = noteById[id];
  delete noteById[id];
  notes = notes.filter(n => n !== note);
}

export function getNote(id) {
  return noteById[id];
}

export function getAllNotes() {
  return notes;
}

export function updateNote(id, text) {
  noteById[id].text = text;
}

const defaultUser = Object.assign(new User(), { id: 'bachnx' });

export function getUser() {
  return defaultUser;
}

addNote('Holysteel');
addNote('Wow, perfect');
addNote('unBeliVEable');
