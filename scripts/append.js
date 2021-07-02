const append = (node, child) => {
    if(child.length) {
        return child.forEach( chld => node.appendChild(chld));
    }
    return node.appendChild(child)
}

export default append;