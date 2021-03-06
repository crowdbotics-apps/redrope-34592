// Please, update the values below as instructed in the README.md file.
export const GOOGLE_WEB_CLIENT_ID = "406178550116-491aoap2rnop4pq2qp6nmgcm2n9sfkp1.apps.googleusercontent.com"
export const GOOGLE_IOS_CLIENT_ID = "406178550116-491aoap2rnop4pq2qp6nmgcm2n9sfkp1.apps.googleusercontent.com"
export const APPLE_SERVICE_ID = "H2VCZ2BX4G.org.reactjs.native.example.redrope-34592"
export const APPLE_REDIRECT_CALLBACK =
  "https://your-app-here.com/accounts/apple/login/callback/"

// -----------------------------------------------------
const messageMap = {
  "Request failed with status code 400": {
    code: 400,
    message: "Invalid credentials."
  },
  "Request failed with status code 403": {
    code: 403,
    message: "You do not have access to this resource."
  },
  "Request failed with status code 500": {
    code: 500,
    message: "Unexpected Server Error."
  },
  "Network Error": {
    code: null,
    message:
      "Network Error: It was not possible to establish a connection with the server."
  }
}

export const mapErrorMessage = error => {
  const message = error.message
  return messageMap[message]
    ? { ...messageMap[message] }
    : { code: null, message }
}
