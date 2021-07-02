import create from "./create.js";
import append from "./append.js";

const createNotes =  ( data, idx = null) => {
    if( typeof data === 'object'){
        const month = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const spans = [];

        for (const key in data){
            const value = data[key];
            const span = create('span');
            switch(key){
                case 'created': {
                    span.innerHTML = `${month[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`;
                    break;
                }
                case 'dates': {
                    const dates = []
                    value.length > 0 ?
                        value.forEach( date => dates.push(date)) :
                        null;
                    span.innerHTML = dates.join(',');
                    break;
                }
                default : {
                    span.innerHTML =  value;
                }
            }
            spans.push(span);
        }
        return spans;
    }
    else if( data === 'btn' || data === 'archiveButton'){
        const span = create('span');
        const deleteButton = create('span');
        const archiveButton = create('span');
        const editButton = create('span');


        deleteButton.className = 'delete_btn span_buttons';
        deleteButton.dataset.id = idx;
        archiveButton.className = 'span_buttons archiveButton';
        archiveButton.dataset.id = idx;
        editButton.className = 'span_buttons editButton';
        editButton.dataset.id = idx
        editButton.innerHTML = 'Edit'

        data === 'btn' ?
            append(span, [editButton, archiveButton, deleteButton]) :
            append(span,[archiveButton, deleteButton]);
        return span;
    }
};

export default createNotes;