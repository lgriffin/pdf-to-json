# pdf-to-json

`pdf-to-json` is a TypeScript library designed to extract text from PDF files and convert it into a JSON representation. This library can be used as a standalone command-line tool or as part of a larger application.

## Features

- Extract text from PDF files
- Generate JSON files with the extracted text
- Can be used as a CLI tool
- Can be integrated into other projects within a monorepo

## Installation

### As a Standalone CLI Tool

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd pdf-to-json
   npm install
   npm run build
   npm link
    ```

To use the CLI simply run pdf-to-json <name>.pdf and this will produce <name>.json

## API Documentation

readPdf(filePath: string): Promise<string>

Description: Reads a PDF file and returns its text content.
Parameters:
filePath (string): The path to the PDF file.
Returns: A promise that resolves to the extracted text content. Capturing this as a JSON object allows you to work in memory or parse to file system