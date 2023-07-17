import * as axios from "axios";

const getPositionFromAddress = async (address: any) => {

    try {
        const reponse = await axios.default.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_MAP_KEY}`
        );

        if (reponse.data.results.length === 0) {
            return undefined;
        } else {
            return reponse.data.results[0].geometry.location;
        }
    } catch (error) {

    }
}


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


export {getPositionFromAddress, equalArrays, pick}