#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
const pdf = require('pdf-parse');

// Function to read a PDF file and return its text content
async function readPdf(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}

// Export the readPdf function for use in other projects
export { readPdf };

// If this file is run directly from the command line, process PDFs
if (require.main === module) {
    (async () => {
        const args = process.argv.slice(2);
        if (args.length === 0) {
            console.error('Please provide at least one PDF file.');
            process.exit(1);
        }

        for (const pdfFile of args) {
            try {
                const text = await readPdf(pdfFile);
                const jsonFileName = path.basename(pdfFile, path.extname(pdfFile)) + '.json';
                const jsonContent = { text };
                fs.writeFileSync(jsonFileName, JSON.stringify(jsonContent, null, 2));
                console.log(`Processed ${pdfFile} and saved to ${jsonFileName}`);
            } catch (error) {
                console.error(`Failed to process ${pdfFile}:`, error);
            }
        }
    })();
}
