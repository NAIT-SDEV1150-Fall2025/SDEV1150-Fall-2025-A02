// Fetch utility function
// fetch is what's called async
// async/await these are special commands that allow you to fulfill promises
// we are "fetching" over the network to the backend which can
// fail or succeed, but this also takes time.
export async function getData(endpoint) {
  // to make the request we need to explicitly "await"
  const response = await fetch(
    endpoint,
    { method: 'GET' }, // this is the default obj
  );
  // this is going to give you all of the information about the response itself.
  // we're going to throw an error if the response is not ok.
  console.log('Response', response);
  if (!response.ok) {
    // you can raise errors by "throwing" them
    throw new Error('Network response failed');
    // this above can only be caught by a try ... catch
  }
  // the response we get a json string, response has a method called .json()
  // which is going to parse the json into a useable javascript object
  const data = await response.json();
  // you can't guarantee how long it is so it's
  // also a promise if it can parsed or not.
  console.log('data', data);
  return data;
}

// POST utility function
// this is going to take a js object
export async function postData(endpoint, payload) {
  // note the body data is normally called payload
  const response = await fetch(endpoint, {
    method: 'POST', // giving info to the server
    headers: { // extra information for the request.
      'Content-Type': 'application/json',
      // let the server know that you're sending json
    },
    body: JSON.stringify(payload),
  });
}


// TODO: Add DELETE function here
