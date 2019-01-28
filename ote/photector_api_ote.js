
// #################################################################
//
// PHOTECTOR API for logging in and creating a One-Time Event
//
// This code uses the AJAX library for http access. If you need have
// not loaded it, use something like this in your HTML:
// <script
//    src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js">
// </script>
//





///////////////////////////////////////////////////////////////////////
//
// apiRequest_loginAndGetApiAccessToken(...)
// ------------------------------------
// Get access_token required for further API requests
//
// Parameter List:
// --------------
//     loginUrl - supplied by Photector, different for dev vs. prod
//     clientId -  supplied by Photector
//     clientSecret - supplied by Photector
//     username - your photector login username
//     password - your photector login password
//     successCallback(accessToken) - invoked with the `accessToken` needed
//                                    for further API use.
//     errorCallback(errorObject) - invoked when something goes wrong. Examples:
//
//       errorObject = {
//         ...
//         responseJSON: { message: "Not found." },
//         status: 404
//         statusText: "error"
//         ...
//       }
//
//       errorObject = {
//         ...
//         responseJSON: {
//             error: "invalid_credentials",
//             message: "The user credentials were incorrect."
//         },
//         status: 401,
//         statusText: "error"
//         ...
//       }
//

var apiRequest_loginAndGetApiAccessToken = function(
    loginUrl,
    clientId,
    clientSecret,
    username,
    password,
    successCallback,
    errorCallback)
{
    try {
        var ajaxData = {
            url: loginUrl,
            type: 'post',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                grant_type: 'password',
                client_id: clientId,
                client_secret: clientSecret,
                username: username,
                password: password
            },
            success: function(data) { successCallback(data.access_token) },
            error: function(error) { errorCallback(error) }
        };
        $.ajax(ajaxData);

    } catch(err) {
        errorCallback(err);
    }
};





///////////////////////////////////////////////////////////////////////
//
// apiRequest_generateOte(...)
// ----------------------
// Generate a new One-Time event
//
// Parameter List:
// --------------
//     oteUrl - supplied by Photector, different for dev vs. prod
//     accessToken - returned by API call loginAndGetApiAccessToken(...)
//     name - the Full Name of the the OTE recipient
//     description - the text description of the OTE
//     expirationDate - the date the OTE will exire, can be null
//     tags - a array of searchable string "tags" for the OTE
//     email - email address to which the OTE will be delivered
//     phone - phone number to which the OTE will be delivered as SMS/text
//     successCallback(oteData) - returned on successful OTE creation. Example:
//       oteData = {
//           attributes: {
//               company: null
//               created_at: "2019-01-28T17:54:26Z"
//               deleted_at: null
//               event_id: null
//               expired_at: "2019-03-20T05:00:00Z"
//               hash_id: "NWDQV7"
//               id: 164
//               last_notification: null
//               link: "https://peir.app.link/?eventId=NWDQV7"
//               meta: {
//                   description: "OTE79",
//                   tags: [ "OTE79TAG1", "OTE79TAG2" ]
//               },
//               name: "OTE79PBN"
//               redeemed_at: null
//               sender: {
//                   email: "peter@peternelson.com"
//                   name: "Peter Nelson"
//                   phone: null
//               }
//           }
//           id: 64,
//           type: "one_time_events"
//       }
//
//
//     errorCallback(errorObject) - invoked when something goes wrong. Examples:
//       errorObject = {
//         ...
//         responseJSON: {
//             errors: { name: ["The name field is required."] },
//             message: "The given data was invalid."
//         },
//         status: 422,
//         statusText: "error"
//         ...
//       }
//

var apiRequest_generateOte = function(
    oteUrl,
    accessToken,
    name,
    description,
    expirationDate,
    tags,
    email,
    phone,
    successCallback,
    errorCallback)
{
    try {
        var ajaxData = {
            url: oteUrl,
            type: 'post',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded',
            headers: { Authorization: 'Bearer ' + accessToken },
            data: {
                name: name,
                description: description,
                expired_at: getDateAsNullOrISO(expirationDate),
                tags: tags,
                email: email,
                phone: phone
            },
            success: function(data) { successCallback(data.data) },
            error: function (error) { errorCallback(error) }
        };

        // null or empty parameters should be deleted from JSON object
        if (ajaxData.data.expired_at == null) {
            delete ajaxData.data.expired_at;
        }
        if (ajaxData.data.phone == undefined || ajaxData.data.phone == "") {
            delete ajaxData.data.phone;
        }
        if (ajaxData.data.email == undefined || ajaxData.data.email == "") {
            delete ajaxData.data.email;
        }

        // send the ajax request
        $.ajax(ajaxData);

    } catch(err) {
        errorCallback(err);
    }
};





// helper function to format Date string or object properly for the API
// example: "11/30/18" should be formatted as "2018-11-30T05:59:59.999Z"
var getDateAsNullOrISO = function(dateOrString) {
    if (dateOrString == undefined ||
        dateOrString.toString() == null ||
        dateOrString.toString().length == 0)
    {
        return  null;
    }
    var dateString = dateOrString.toString();
    var isoString = (new Date(Date.parse(dateString))).toISOString();
    return isoString;
};
