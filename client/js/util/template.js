import axios from 'axios';

export default (templateUri, callback) => {
  axios({
    method: 'get',
    url: `/template/${templateUri}.html`,
  })
    .then((response) => {
      return callback(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
