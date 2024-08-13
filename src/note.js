// instance variables
// private variables

import { Db } from "./db.js";

// public variables
const db = new Db();

export class Note {
  async addNote(content) {
    let note = {
      id: Date.now(),
      content,
    };
    db.createFile(note);
  }

  updateNote = (noteObj) => {
    db.update(noteObj);
  };

  deleteNote = () => {};

  getNotes = () => {};

  getNotesById = () => {};

  clearNotes = () => {};
}
