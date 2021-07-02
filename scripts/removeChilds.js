import removeChild from "./removeChild.js";

const removeChilds = (node) => {
    while(node.childElementCount > 1){
        const last_child = node.lastElementChild;
        removeChild(node, last_child);
    }
}
export default removeChilds;