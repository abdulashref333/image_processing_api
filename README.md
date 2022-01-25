# image_processing_api

API For Image processing :

- resizing
- change the image extension
- rotate

## Prerequisites

- install [nodejs](https://nodejs.org/en/download/)

## Run

- `npm install`
- `npm start`

## Test

- run `npm run test`

## API Routes

- Home Page Route `/`
- All API routes start with `/api`:
- `/images`:
  - GET `/images?filename=exampl.jpg&&width=250&&height=250`
  - POST `/upoladImage` upload image for resizing
  - GET `/thumbnail ` get the desired image.

## Notes befor testing:

- put the image which you need to process at `./public/images` directory.
- you should provide a full name of the image including the extension type at url.
- make sure you stoped the server before running the test script.
