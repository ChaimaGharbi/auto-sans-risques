export const matching = (pipelines, options) => {
    const match: Record<string, any> = {};

    for (const key in options) {
        match[key] = {$regex: options[key], $options: 'i'};
    }

    pipelines.push({$match: match});
}

