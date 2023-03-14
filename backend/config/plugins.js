// module.exports = ({ env }) => ({
//     upload: {
//       config: {
//         provider: "strapi-provider-upload-imagekit",  // Community providers need to have the full package name
//         providerOptions: {
//           publicKey: "public_LMKwC8uiPpTL1CGij/ahogXFDkI=",
//           privateKey: "private_YCJfnpVyBWv1MgHAsiTrt3SlOoI=",
//           urlEndpoint: "https://upload.imagekit.io/api/v1/files/upload",  // Example: https://ik.imagekit.io/username
  
//           // Optional
//           params: {
//             folder: "/production/images"  // Defaults to "/" if value is not supplied
//           }
//         }
//       }
//     }
//   });







// const FormData = require('form-data');
// const axios = require('axios');
// const fs = require('fs');

// module.exports = {
//   async upload(ctx) {
//     const { files } = ctx.request.body;
//     const { provider } = strapi.plugins.upload.config;
//     const form = new FormData();

//     for (const file of files) {
//       const { path, name, type } = file;
//       const stream = fs.createReadStream(path);
//       form.append('files', stream, { filename: name, contentType: type });
//     }

//     // Send the upload request to the configured provider
//     const response = await axios.post(provider.config.providerOptions.urlEndpoint, form, {
//       headers: {
//         ...form.getHeaders(),
//         Authorization: `Basic ${Buffer.from('public_LMKwC8uiPpTL1CGij/ahogXFDkI=' + ':' + 'private_YCJfnpVyBWv1MgHAsiTrt3SlOoI=').toString('base64')}`,
//       },
//       params: provider.config.providerOptions.params,
//     });

//     // Extract the URL of the uploaded image from the response
//     const imageUrl = response.data.url;

//     // Log the URL in the console
//     console.log(imageUrl);

//     return {
//       url: imageUrl,
//       // Other metadata about the uploaded file can be returned here
//     };
//   },
// };








const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

module.exports = {
  async upload(ctx) {
    const { files } = ctx.request.body;
    const { provider } = strapi.plugins.upload.config;
    const form = new FormData();

    for (const file of files) {
      const { path, name, type } = file;
      const stream = fs.createReadStream(path);
      form.append('files', stream, { filename: name, contentType: type });
    }

    // Send the upload request to the configured provider
    const response = await axios.post('https://upload.imagekit.io/api/v1/files/upload', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${Buffer.from('public_LMKwC8uiPpTL1CGij/ahogXFDkI=' + ':' + 'private_YCJfnpVyBWv1MgHAsiTrt3SlOoI=').toString('base64')}`,
      },
      params: "/production/images",
    });

    // Extract the URL of the uploaded image from the response
    const imageUrl = response.data.url;

    // Log the URL in the console
    console.log(imageUrl);

    return {
      url: imageUrl,
      // Other metadata about the uploaded file can be returned here
    };
  },
};
