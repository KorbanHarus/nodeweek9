# Node.js Example: MongoDB Bas64
An example of writing and reading documents containing Base64 data (JPEG only).  This example needs access to a collection named `photo`.

When you study this example, please pay attention to the following:
1. How to handle `multipart/form-data` and in particular extracting form data.
2. How to read an uploaded file.
3. How to convert the uploaded file to Base64.
4. How to insert documents containing Base64 data.
5. How to decode Base64 data.

## Getting Started
Change the value of variable `mongourl` to your mlab database.
### Installing
```
npm install
```
### Running
```
npm start
```
### Testing
1. Send a GET request to insert a photo:
http://localhost:8099/
2. Send a GET request to see a list of photos in your `photo` collection:
http://localhost:8099/photos
