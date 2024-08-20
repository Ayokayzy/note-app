import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fsPromises } from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the file path
const filePath = path.resolve(__dirname, "../DB_FILE.json");

export class Db {
  filePath = "";
  notes = [];
  constructor() {
    this.filePath = filePath;
  }

  async allNotes() {
    // fs.readFile(this.filePath, (error, notes) => {
    //   if (error) {
    //     console.log(error, "all note error");
    //     return [];
    //     // console.log(error)
    //     // error,
    //   }
    //   const noteObject = notes ? JSON.parse(notes) : { notes: [] };
    //   // console.log({ filepath: noteObject["notes"] }, "hjhjhjhjh");
    //   return noteObject["notes"];
    // });
    try {
      const notesData = await fsPromises.readFile(this.filePath, "utf-8");
      const noteObject = notesData ? JSON.parse(notesData) : { notes: [] };
      return noteObject["notes"]; // Return the notes array
    } catch (error) {
      console.log(error, "Error fetching notes");
      return []; // Return an empty array in case of an error
    }
  }

  update(noteObj) {
    fs.readFile(this.filePath, (error, notes) => {
      if (error) {
        console.log(error, "all note error");
        return {
          error,
        };
      }
      const noteObject = notes ? JSON.parse(notes) : { notes: [] };
      // console.log({ filepath: noteObject.notes });
      const allNotes = noteObject.notes;

      const newNotes = allNotes.map((note) => {
        if (noteObj.id === note.id) {
          return noteObj;
        } else {
          return note;
        }
      });
      console.log({ newNotes }, "note updated successfully");
      this.save(newNotes);
    });
  }

  async new(newNote) {
    fs.readFile(this.filePath, "utf-8", (error, notes) => {
      if (error) {
        console.log(error, "all note error");
        return {
          error,
        };
      }
      const noteObject = notes ? JSON.parse(notes) : { notes: [] };

      noteObject.notes.push(newNote);
      this.save(noteObject.notes);
      console.log("new note created");
    });
  }
  // async find(newNote) {
  //   fs.readFile(this.filePath, "utf-8", (error, notes) => {
  //     if (error) {
  //       console.log(error, "all note error");
  //       return {
  //         error,
  //       };
  //     }
  //     const noteObject = notes ? JSON.parse(notes) : { notes: [] };

  //     console.log(noteObject, newNote,'find')

  //     // noteObject.notes.push(newNote);
  //     // this.save(noteObject.notes);
  //     // console.log("new note created");
  //   });
  // }

  async save(notes) {
    fs.writeFile(this.filePath, JSON.stringify({ notes }), "utf-8", (error) => {
      if (error) {
        console.log({ error }, "save note error");
        return { error };
      }
    });
  }

  createFile(note) {
    fs.stat(filePath, (err, stat) => {
      if (err == null) {
        console.log("File exists");
        this.new(note);
      } else if (err.code === "ENOENT") {
        // file does not exist
        fs.writeFile(
          filePath,
          JSON.stringify({ notes: [] }),
          "utf-8",
          (error) => {
            if (error) {
              return console.log({ error }, "erroorrr");
            }
            console.log("file created");
            this.new(note);
          }
        );
        return filePath;
      } else {
        console.log("Some other error: ", err.code);
        return null;
      }
    });
  }
}
