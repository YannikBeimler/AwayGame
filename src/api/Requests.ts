export const get = async (path: string) => {
  const apiRequest = new Request(path);
  const apiResponse = await fetch(apiRequest);

  if (!apiResponse.ok) {
    throw new Error(await apiResponse.text());
  }

  return await apiResponse.json();
};

export const post = async (path: string, body: string) => {
  const apiRequest = new Request(path);

  const apiResponse = await fetch(apiRequest, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    headers: { "Content-Type": "application/json" },
    body: body
  });

  if (!apiResponse.ok) {
    console.error(apiResponse);
    throw new Error(await apiResponse.text());
  }

  return await apiResponse.json();
};
