import removeChilds from "./removeChilds.js";
import create from "./create.js";
import createNotes from "./createNotes.js";
import append from "./append.js";

const render = (data, node) => {
    node !== [] && removeChilds(node);
    if(data.length && node.id === 'notes'){
        data.forEach( (item, idx) => {
            const child =  create('div');
            child.className = 'note';
            child.dataset.id = idx;
            createNotes(item).forEach( item => append(child, item))
            append(child, createNotes('btn', idx));
            append(node, child);
        })
    }
    else if(node.id === 'archivedNotes'){
        data.forEach( (item, idx) => {
            const child =  create('div');
            child.className = 'note';
            child.dataset.id = idx;
            createNotes(item).forEach( item => append(child, item))
            append(child, createNotes('archiveButton', idx));
            append(node, child);
        })
    }
    console.log('rendered')
}
export default  render;