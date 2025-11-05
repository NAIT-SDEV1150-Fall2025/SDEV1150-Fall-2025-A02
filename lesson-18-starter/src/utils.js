// Fetch utility function
export async function fetchData(endpoint) {
  const response = await fetch(endpoint);
  // take a look at the response
  console.log(response);
  // if you want to take a look at the
  // text if it's not working you can
  // take a look at the text with the
  // following line.
  // console.log(await response.text());
  // when it's a 404 the above says "Not Found"
  // which isn't valid json so this is the reason
  // why we throw an error
  if (!response.ok) {
    throw new Error('Request failed');
  }

  const data = await response.json();
  // if you don't handle the response
  // not okay you're going to see abit
  // some weird errors
  return data;
}

// POST utility function
// why does this not work! fix it!
export async function postData(endpoint, payload) {
  const response = await fetch(endpoint, {
    method: 'POST',
    // body: payload, // you're trying to send an obj
    // over the network.
    // when don't use JSON.stringify
    // it'll send [Object object] which is not the goal
    // you want to the data
    body: JSON.stringify(payload),
    // not every backend will default to knowing
    // you're sending json.
    // you need to specify the headers
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} - ${text || response.statusText}`);
  }

  const data = await response.json();
  return data;
}
