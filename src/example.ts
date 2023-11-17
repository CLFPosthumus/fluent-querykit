import QueryBuilder from ".";

async function callApi(apiUrl: string, token: string) {
    try {
      const response = await fetch( apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
        },    

      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Replace 'YOUR_API_URL' and 'YOUR_BEARER_TOKEN' with your actual API URL and Bearer token
  const apiUrl = 'YOUR_API_URL';
  const bearerToken = 'API_TOKEN';
  
  const query = new QueryBuilder()
  .equals("firstname", "John")
  .build();

  // Call the API function with the apiUrl and bearerToken
  callApi(`${apiUrl}?${query}`  , bearerToken);
  