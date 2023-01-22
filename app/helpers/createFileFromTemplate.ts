import fs from 'fs';
function createFileFromTemplate(template: string, destination: string) {
    if (template === destination) throw new Error('Cannot create new File at the same location of template.')
    if (!fs.existsSync(template)) throw new Error('template file does not exist.')
    fs.copyFileSync(template, destination)
}

export default createFileFromTemplate;