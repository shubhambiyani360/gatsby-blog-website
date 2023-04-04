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





import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const BlogPost = ({ data }) => {
  const { title, createdAt, blocks } = data.strapiBlog;
  // const image = getImage(cover.localFile);

  return (
    <div>
      {/* <GatsbyImage image={image} alt={title} /> */}
      <h1>{title}</h1>
      <p>{createdAt}</p>
      {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      {blocks.map(({ childStrapiComponentSharedRichTextBodyTextnode }) => {
        const { body } = childStrapiComponentSharedRichTextBodyTextnode;
        return <div dangerouslySetInnerHTML={{ __html: body }} />;
      })}
    </div>
  );
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

export const query = graphql`
query ($slug: String!) {
  strapiBlog(slug: { eq: $slug }) {
    title
    createdAt(formatString: "MMMM DD, YYYY")
    blocks {
      childStrapiComponentSharedRichTextBodyTextnode {
        body
      }
    }
  }
}
`;

export default BlogPost;
