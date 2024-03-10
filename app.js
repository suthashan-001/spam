// to display user friendly messages for Error handling
const statusErrorMsg = {
  400: "The request was invalid. Please check your data and try again.",
  404: "Request Resource not found, Please check and try again",
  500: "Error occurred on server, please try again",
};

// processes the server's response to a request
function handleResponse(response) {
  if (!response.ok) {
    //response.status gives us status code, we check our object for the appropriate msg
    //if the reponse is unsucessful, find and throw the correct error
    const errorMsg = statusErrorMsg[response.status] || "An Error has occurred";
    throw new Error(errorMsg);
  }
  // if response is successful, convert response to JSON and return
  return response.json();
}

/* =============================
  Priority: 2 Need to implement error Ui page
===============================*/

//update UI to nofity user about the specific error
function showError(errorMSg) {
  // display error msg by innerhtml
  // ... to fill in
}

/* ============================================
    Helper functions for Fetching (Get & Post)
===============================================*/

const baseUrl =
  "/w24-csci2020u-assignment01-zahir-tabassum-tharmarajah-rehman/";

// perform GET request
function getFetchMe(endpoint, updateFunc) {
  const url = `${baseUrl}${endpoint}`;

  fetch(url, {
    method: "GET",
  })
    //handle the response, includes check for errors
    .then(handleResponse)
    .then((data) => {
      // uses the recieved data to update the user interface {this includes functions that update the Accurcy and Percision along with table values}
      updateFunc(data);
    })
    .catch((err) => {
      console.error("Problem with fetch operation, ", err);
    });
}

// perform POST request
function postFetchMe(endpoint, data, sendFunc) {
  const url = `${baseUrl}${endpoint}`;

  //Initalize configuration for the fetch request
  let config = {
    method: "POST",
    headers: {},
    body: data,
  };

  // check if file is formData to handle file uploads
  if (data instanceof FormData) {
    config.body = data;
  } else {
    //for JSON data set header and stringify body
    config.headers["Content-Type"] = "application/json";
    config.body = JSON.stringify(data);
  }

  fetch(url, config)
    //check and process the server response
    .then(handleResponse)
    .then((data) => {
      // this includes functions that deal with sending to server
      sendFunc(data);
    })

    .catch((err) => {
      //Display a specific error message to user interface
      showError("specific error {fill in}");
      console.error("Problem with fetch operation, ", err);
    });
}

/* ==================================================================
  Priority: 1 Need to implement value fetching, waiting on endpoints
=====================================================================*/

/* =======================================
  Fetching Get Functions
==========================================*/

function updateTable() {
  //to be filled in
}
function updateAccuracy() {
  // to be filled in
}
function updatePercision() {
  //to be filled in
}

/* ==================================================
  Priority: 3 Need to add extra feature of dropbox
=====================================================*/

/* ==============================
    Drop Box Feature
=================================*/

// doc: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop

/* event handlers 

  - 'dragenter': fired when a dragged item enters a valid drop target
  - 'dragover' : fired continuously  as a dragged item is being dragged
  - 'dragleave': fired when a dragged item leaves a valid drop target 
  - 'drop'     : fired when an item is dropped on a valid drop target

*/

let dropArea = document
  .getElementById("drop-area")
  .addEventListener("drop", handleDrop);

// handle file drop event
function handleDrop(e) {
  //prevent default behavior of file being opened
  e.preventDefault();
  e.stopPropagation();

  var data = e.dataTransfer;

  if (data.items) {
    //access each dragged item
    [...data.items].forEach((item, i) => {
      //check to see if dropped items are files
      if (item.kind === "file") {
        // if the item is a file, retrieve it
        const file = item.getAsFile();
      }
    });
  }
}

// uploads files to server
function uploadFiles(files) {
  //files is an array that holds individual files

  let url = "/upload";
  // Form Data is used for file uploads
  let formData = new FormData();

  //loop through files array
  [...files].forEach((file) => {
    // add file to formData object
    formData.append("file", file); // {the server should expect the key of "file"}
  });

  //send file to server
  postFetchMe(url, formData);
}
