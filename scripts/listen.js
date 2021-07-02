import query from "./query.js";
import createNotesCount from "./createNotesCount.js";
import render from "./render.js";

const listen = (notes_arr, archived_notes) => {
    const notes = query('#notes');
    const del_btn = query('.delete_btn');
    const archiveButton = query('.archiveButton');
    const editButton = query('.editButton');
    const Task = query('#Task');
    const RandomThought = query('#Random_Thought');
    const Idea = query('#Idea');
    const archivedNotes = query('#archivedNotes');

    const delButtonEvent = (e) => {
        const containerId = e.target.parentNode.parentNode.parentNode.id;
        if (containerId === 'notes') {
            notes_arr.splice(e.target.dataset.id, 1);
            render(notes_arr, notes);
            listen(notes_arr, archived_notes);
        } else {
            archived_notes.splice(e.target.dataset.id, 1);
            render(notes_arr, notes);
            render(archived_notes, archivedNotes)
            listen(notes_arr, archived_notes);
        }
    }
    const archiveButtonsEvent = (e) => {
        const containerId = e.target.parentNode.parentNode.parentNode.id;
        if (notes_arr.length && containerId === 'notes') {
            archived_notes.push(notes_arr.splice(e.target.dataset.id, 1)[0]);
            render(notes_arr, notes);
            render(archived_notes, archivedNotes)
            listen(notes_arr, archived_notes);
        } else {
            notes_arr.push(archived_notes.splice(e.target.dataset.id, 1)[0]);
            render(notes_arr, notes);
            render(archived_notes, archivedNotes)
            listen(notes_arr, archived_notes);
        }
    }
    const archiveButtonEvent = (e) => {
        if(archived_notes.length > 0) {
            archived_notes.push(notes_arr.splice(e.target.dataset.id, 1));
            listen(notes_arr, archived_notes);
            render(notes_arr, notes);
            render(archived_notes, archivedNotes)
        }
    }
    const editNoteEvent = (e) => {
        const index = query('#notes #editForm').dataset.id;
        const date = query('#notes #editNoteDate');
        const noteName = query('#notes #editNoteName');
        const noteCategory = query('#notes #editNoteCategory').value;
        const noteContent = query('#notes #editNoteContent');
        const editedNote = {};
        const isCorrect = !!noteName.value && !!noteContent.value;
        if (isCorrect) {
            e.preventDefault();
            editedNote.name = noteName.value;
            editedNote.category = noteCategory;
            editedNote.content = noteContent.value;
            if (date.value !== '') {
                editedNote.dates = !notes_arr[index].dates.indexOf(date.value) > -1 ?
                    [...notes_arr[index].dates, date.value] :
                    [...notes_arr[index].dates]
            }

            noteName.value = '';
            noteContent.value = '';
            date.value = '';
            notes_arr[index] = {...notes_arr[index], ...editedNote}
            render(notes_arr, notes);
            listen(notes_arr, archived_notes);
        }
    };

    createNotesCount(notes_arr, archived_notes, Task);
    createNotesCount(notes_arr, archived_notes, RandomThought);
    createNotesCount(notes_arr, archived_notes, Idea);


    del_btn.length &&
    del_btn.forEach((btn, idx) => {
        if (idx > 0) {
            btn.addEventListener('click', delButtonEvent)
        }
    })
    if (archiveButton.length > 1) {
        archiveButton.forEach((btn, idx) => {
                idx > 0 &&
                btn.addEventListener('click', archiveButtonsEvent)
            }
        )
    } else {
        archiveButton &&
        archiveButton.addEventListener('click', archiveButtonEvent)
    }

    editButton.length &&
    notes_arr.length > 0 &&
    editButton.forEach(item => {
        item.addEventListener('click', (e) => {
            render(notes_arr, notes);
            listen(notes_arr, archived_notes);

            const editForm = query('#editForm').cloneNode(true);
            const note_node = query('#notes > .note');

            editForm.dataset.id = e.target.dataset.id;
            note_node.forEach(note => {
                if (note.id >= 0 && note.dataset.id === e.target.dataset.id) {
                    note.replaceWith(editForm);
                    const editNote = query('#notes #editNote');
                    editNote.addEventListener('click', editNoteEvent)
                }
            })
        })
    })

};
export default listen;