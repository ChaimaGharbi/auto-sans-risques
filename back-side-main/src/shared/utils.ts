function equalArrays(first, second) {
    if (first.length !== second.length) return false;
    for (let i = 0; i < first.length; i++) {
        if (first[i] !== second[i]) return false;
    }
    return true;
}

function pick(v, old) {
    if (!Array.isArray(v)) {
        if (v && v !== old) {
            return v;
        }
    } else {
        if (v && !equalArrays(v, old)) {
            return v;
        }
    }
    return old;
}

export {equalArrays, pick}