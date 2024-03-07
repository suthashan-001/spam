/*
    To Do: [Create a error page, show ui for errors]
*/ 

// to display user friendly messages for Error handling 
const statusErrorMsg = {
    400 : "The request was invalid. Please check you data and try again.",
    404 : "Request Resource not found, Please check and try again",
    500 : "Error occured on server, please try again"
}

// handle response function
function handleResponse(response){
    if(!response.ok){
        //response.status gives us status code, we check our object for the appropriate msg
        const errorMsg = statusErrorMsg[response.status] || "An Error has occured"
        throw new Error(errorMsg);
    }
    // if response is ok (meaning successful server connection return response json)
    return response.json();
}

// helper fetch function template
function getFetchMe(endpoint, func){
    fetch(`url/${endpoint}` ,{
        method: "GET",
        // Get header not necessary
    })
    //handle the response, includes check for errors
    .then(handleResponse)
    //retrieve data from back-end
    .then(data => {
        // do stuff
        func(data)
        // update ui based on response
    })
    .catch(err => {
        console.error("Problem with fetch operation, ", err)
    })
}

function postFetchMe(endpoint,func){
    fetch(`url/${endpoint}` ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(func) //func sends data in the format of {key: value}
    })
    //check server connection
    .then(handleResponse)
    //retrieve data from back-end
    .then(data => {
        // do stuff
        func(data)
        // update ui based on response
    })

    // User Friendly messages using a map to HTTP status code
    .catch(err => {
        showError("specific error {fill in}")
        console.error("Problem with fetch operation, ", err)
    })
}

//update UI to nofity user about the specific error
function showError(errorMSg){
    // display error msg by innerhtml

    // ... to fill in
}