import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
    fs.readFile(this.filePath, (error, notes) => {
      if (error) {
        console.log(error, "all note error");
        return {
          error,
        };
      }
      const noteObject = JSON.parse(notes);
      console.log({ filepath: noteObject.notes });
      return noteObject["notes"];
    });
  }

  update(noteObj) {
    fs.readFile(this.filePath, (error, notes) => {
      if (error) {
        console.log(error, "all note error");
        return {
          error,
        };
      }
      const noteObject = JSON.parse(notes);
      console.log({ filepath: noteObject.notes });
      const allNotes = noteObject.notes;
      // [1, 2, 3, 4, 5] // 6
      // [1, 2, 6, 4, 5]
      // const foundIndex = allNotes.findIndex((item) => item.id === noteObj.id);
      // const foundNote = allNotes.find((item) => item.id === noteObj.id);
      // allNotes.splice(foundIndex, 1, foundNote);
      const newNotes = allNotes.map((note) => {
        if (noteObj.id === note.id) {
          return noteObj;
        } else {
          return note;
        }
      });
      console.log({ newNotes });
      this.save(newNotes);
    });
  }

  async new(newNote) {
    console.log("in new note");

    fs.readFile(this.filePath, "utf-8", (error, notes) => {
      if (error) {
        console.log(error, "all note error");
        return {
          error,
        };
      }
      const noteObject = JSON.parse(notes);
      console.log({ filepath: noteObject.notes });
      noteObject.notes.push(newNote);
      this.save(noteObject);
    });
  }

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

class Person {
  name = "";
  age = "";

  walk() {}

  run() {}

  talk() {}

  eat() {}
}

class Car {
  color = "";
  model = "";

  constructor(color, model) {
    this.color = color;
    this.model = model;
  }

  move() {}

  honk() {}
}

const person1 = new Person();

const person2 = new Person();

const toyotaCamry2020 = new Car("black", 2020);
// console.log(toyotaCamry2020.color);

const toyotaCamry2021 = new Car("red", 2021);
// console.log(toyotaCamry2021.color);

function myFunction() {}

const myFun = function () {};

const myFunc = () => {};
