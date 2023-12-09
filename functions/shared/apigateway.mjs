export const getResponse = (statusCode, response = null) => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    ...response && { body: JSON.stringify(response) }
  };
};