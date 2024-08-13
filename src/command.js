import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Note } from "./note.js";
const note = new Note();

yargs(hideBin(process.argv))
  .command(
    "new <content>",
    "creates a new note",
    () => {},
    (args) => {
      note.addNote(args.content);
    }
  )
  .command(
    "find <filter>",
    "get matching note",
    () => {},
    (args) => {
      console.log(args);
    }
  )
  .command(
    "remove <id>",
    "remove a note by id",
    () => {},
    (args) => {
      const noteObj = {
        id: args.id,
      };
      note.updateNote({});
    }
  )
  .command(
    "update <id> <newContent>",
    "update a note by id",
    () => {},
    (args) => {
      const noteObj = {
        id: args.id,
        content: args.newContent,
      };
      note.updateNote(noteObj);
    }
  )
  .command(
    "all",
    "get all notes",
    () => {},
    (args) => {
      console.log(args);
    }
  )
  .command(
    "clear",
    "removes all note",
    () => {},
    (args) => {
      console.log(args);
    }
  )
  .demandCommand(1)
  .parse();
