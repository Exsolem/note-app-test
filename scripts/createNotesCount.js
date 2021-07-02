const createNotesCount = (notes=[], archivedNotes = [], node) =>{
    let nodes = [];
    const id = node.id.split('_').join(' ');
    node.childNodes.forEach( item => nodes.push(item))
    nodes = nodes.filter( item => item.nodeName === "SPAN")
    nodes.forEach( (item, idx) => {
        switch(idx){
            case 0:{
                item.innerHTML = id;
                break;
            }
            case 1:{
                item.innerHTML = notes.filter( item => item.category === id).length;
                break;
            }
            case 2:{
                item.innerHTML = archivedNotes.filter( item => item.category === id).length
                break;
            }
        }
    })
}
export default createNotesCount;