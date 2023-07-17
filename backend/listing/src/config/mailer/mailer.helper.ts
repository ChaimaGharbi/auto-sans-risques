import * as path from 'path';
import * as utils from 'util';
import * as fs from 'fs';
import * as hb from 'handlebars';

const readFile = utils.promisify(fs.readFile);

async function getTemplateHtml() {

    try {
        const tempPath = path.resolve(`${__dirname}` + `/mail.template.html`);

        return await readFile(tempPath, 'utf8');
    } catch (err) {
        return Promise.reject('Could not load html template');
    }
}

export async function getHtml(data: any) {
    return getTemplateHtml().then(async res => {
        const template = hb.compile(res, {strict: true});
        const result = template({
            body: data
        });
        return result;
    });
}
