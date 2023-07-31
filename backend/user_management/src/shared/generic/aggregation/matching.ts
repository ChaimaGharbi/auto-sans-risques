export const matching = (pipelines, options) => {
    const match: Record<string, any> = {};
    for (const key in options) {
        if (options[key] !== null && options[key] !== undefined && options[key][0] !== null) {
            match[key] = {$regex: options[key], $options: 'i'};
        }
    }
    console.log("match", match)

    pipelines.push({$match: match});
}

