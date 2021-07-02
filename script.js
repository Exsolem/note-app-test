import render from "./scripts/render.js";
import query from "./scripts/query.js";
import listen from "./scripts/listen.js";



const notes_arr = [
    {
        name: 'name_1',
        created: new Date(),
        category: 'Task',
        content: 'some content',
        dates:[]
    },
    {
        name: 'name_2',
        created: new Date(),
        category: 'Random Thought',
        content: 'some content',
        dates:[]
    },
    {
        name: 'name_3',
        created: new Date(),
        category: 'Random Thought',
        content: 'some content',
        dates:[]
    },
    {
        name: 'name_4',
        created: new Date(),
        category: 'Idea',
        content: 'some content',
        dates:[]
    },
    {
        name: 'name_5',
        created: new Date(),
        category: 'Task',
        content: 'some content',
        dates:[]
    }
];
const archived_notes = [];
const notes = query('#notes');
const create_note  = query('#create_note');
const deleteAllBtn = query('#delete_all_btn');
const archiveAllBtn = query('#archive_all_btn');

const archiveAllEvent = () =>{
    if(notes_arr.length > 0) {
        notes_arr.splice(0, notes_arr.length).forEach(item => archived_notes.push(item))
        render(notes_arr, notes);
        render(archived_notes, archivedNotes)
        listen(notes_arr, archived_notes)
    }
}
const deleteAllEvent = ()=>{
    if(!!notes_arr.length) {
        notes_arr.splice(0, notes_arr.length);
        render(notes_arr, notes);
        render(archived_notes, archivedNotes)
        listen(notes_arr, archived_notes)
    }
}
const createNoteEvent = (e)=> {
    const date = query('#noteDate');
    const noteName = query('#noteName');
    const noteCategory = query('#noteCategory').value;
    const noteContent = query('#noteContent');
    const notes = query('#notes');
    const archivedNotes = query('#archivedNotes');
    const newNote = {};
    const isCorrect = !!noteName.value && !!noteContent.value;
    if (isCorrect) {
        e.preventDefault();
        newNote.name = noteName.value;
        newNote.created = new Date();
        newNote.category = noteCategory;
        newNote.content = noteContent.value;
        newNote.dates = [date.value] || [];


        noteName.value = '';
        noteContent.value = '';
        date.value = '';
        notes_arr.push(newNote);

        render(notes_arr, notes);
        render(archived_notes, archivedNotes)
        listen(notes_arr, archived_notes);
    }
}

create_note.addEventListener('click', createNoteEvent);
deleteAllBtn.addEventListener('click', deleteAllEvent);
archiveAllBtn.addEventListener('click', archiveAllEvent);

render(notes_arr, notes);
listen(notes_arr, archived_notes);






