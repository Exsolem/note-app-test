const query = (selector) =>{
    const q = document.querySelectorAll(selector);
    if(q.length === 1) return q[0];
    else return q;
}

export default query;