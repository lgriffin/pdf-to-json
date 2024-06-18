#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readPdf = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pdf = require('pdf-parse');
// Function to read a PDF file and return its text content
async function readPdf(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
}
exports.readPdf = readPdf;
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
            }
            catch (error) {
                console.error(`Failed to process ${pdfFile}:`, error);
            }
        }
    })();
}
