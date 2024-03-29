# image_processing_api

API For Image processing :

- resizing
- change the image extension
- rotate

## Technologies and tools
* node js
* Type Script
* Jasmine for testing
* [sharp](https://www.npmjs.com/package/sharp) module for doing the process on images.
* eslint && prettier
* for the rest of the packages please take a look on `package.json` file.


## Prerequisites

- install [nodejs](https://nodejs.org/en/download/)
- install Docker (optional)

## Run

- `npm install`
- `npm start`

## Run Docker  

-  `docker build -t image-processing-api .`
- `docker run --name image-processing-api-container -p 4000:3000 -d imagag-processing-api`
- After running docker successfully you can access the api at loclalhost:4000 
- To stop the container run `docker stop image-processing-api-container`
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
