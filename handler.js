'use strict';

const { main } = require(".");

module.exports.hello = async (event) => {
  await main()
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
