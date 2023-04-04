"use strict";
exports.id = "component---src-templates-article-post-jshead";
exports.ids = ["component---src-templates-article-post-jshead"];
exports.modules = {

/***/ "./src/templates/article-post.js?export=head":
/*!***************************************************!*\
  !*** ./src/templates/article-post.js?export=head ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
// import React from "react"
// import { graphql } from "gatsby"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Layout from "../components/layout"
// import BlocksRenderer from "../components/blocks-renderer"
// import Seo from "../components/seo"

// const ArticlePage = ({ data }) => {
//   const article = data.strapiArticle

//   const seo = {
//     metaTitle: article.title,
//     metaDescription: article.description,
//     shareImage: article.cover,
//   }

//   return (
//     <Layout as="article">
//       <Seo seo={seo} />
//       <header className="container max-w-4xl py-8">
//         <h1 className="text-6xl font-bold text-neutral-700">{article.title}</h1>
//         <p className="mt-4 text-2xl text-neutral-500">{article.description}</p>
//         <GatsbyImage
//           image={getImage(article?.cover?.localFile)}
//           alt={article?.cover?.alternativeText}
//           className="mt-6"
//         />
//       </header>
//       <main className="mt-8">
//         <BlocksRenderer blocks={article.blocks || []} />
//       </main>
//     </Layout>
//   )
// }

// export const pageQuery = graphql`
//   query ($slug: String) {
//     strapiArticle(slug: { eq: $slug }) {
//       id
//       slug
//       title
//       description
//       blocks {
//         ...Blocks
//       }
//       cover {
//         alternativeText
//         localFile {
//           url
//           childImageSharp {
//             gatsbyImageData
//           }
//         }
//       }
//     }
//   }
// `

// export default ArticlePage



const BlogPost = ({
  data
}) => {
  const {
    title,
    createdAt,
    blocks
  } = data.strapiBlog;
  // const image = getImage(cover.localFile);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, createdAt), blocks.map(({
    childStrapiComponentSharedRichTextBodyTextnode
  }) => {
    const {
      body
    } = childStrapiComponentSharedRichTextBodyTextnode;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      dangerouslySetInnerHTML: {
        __html: body
      }
    });
  }));
};

// export const query = graphql`
//   query ($slug: String!) {
//     strapiBlogs(slug: { eq: $slug }) {
//       id
//       title
//       date(formatString: "MMMM DD, YYYY")
//       content
//       cover {
//         localFile {
//           childImageSharp {
//             gatsbyImageData(width: 800)
//           }
//         }
//       }
//     }
//   }
// `;

const query = "2115850585";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogPost);

/***/ })

};
;
//# sourceMappingURL=component---src-templates-article-post-jshead.js.map