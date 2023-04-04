// const path = require("path")

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions

//   // Define a template for blog post
//   const articlePost = path.resolve("./src/templates/article-post.js")

//   const result = await graphql(
//     `
//       {
//         allStrapiArticle {
//           nodes {
//             title
//             slug
//           }
//         }
//       }
//     `
//   )

//   if (result.errors) {
//     reporter.panicOnBuild(
//       `There was an error loading your Strapi articles`,
//       result.errors
//     )

//     return
//   }

//   const articles = result.data.allStrapiArticle.nodes

//   if (articles.length > 0) {
//     articles.forEach((article) => {
//       createPage({
//         path: `/article/${article.slug}`,
//         component: articlePost,
//         context: {
//           slug: article.slug,
//         },
//       })
//     })
//   }
// }





const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Query for all Strapi blog posts
  const result = await graphql(`
    query MyQuery {
      allStrapiBlog {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  // Create a Gatsby page for each blog post
  result.data.allStrapiBlog.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/article-post.js`),
      context: {
        slug: node.slug,
      },
    });
  });
};
