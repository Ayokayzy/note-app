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

  deleteNoteById = async (id) => {
    try {
      const notes = await db.allNotes();

      const updatedNotes = notes.filter((note) => note.id !== id);

      await db.save(updatedNotes);

      console.log(`Note with id ${id} has been deleted.`);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  getNotes = async () => {
    const notes = await db.allNotes();
    console.log(notes);
    return notes;
  };

  getNotesById = async (id) => {
    const notes = await this.getNotes();
    const note = notes.find((note) => note.id === id);
    return note;
  };

  clearNotes = async () => {
    try {
      // Clear notes by saving an empty array to the file
      await db.save([]);
      console.log("All notes have been cleared.");
    } catch (error) {
      console.error("Error clearing notes:", error);
    }
  };
}
