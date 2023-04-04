// import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Layout from "../components/layout"
// import ArticlesGrid from "../components/articles-grid"
// import Seo from "../components/seo"
// import Headings from "../components/headings"

// const IndexPage = () => {
//   const { allStrapiArticle, strapiGlobal } = useStaticQuery(graphql`
//     query {
//       allStrapiArticle {
//         nodes {
//           ...ArticleCard
//         }
//       }
//       strapiGlobal {
//         siteName
//         siteDescription
//       }
//     }
//   `)

//   return (
//     <Layout>
//       <Seo seo={{ metaTitle: "Home" }} />
//       <Headings
//         title={strapiGlobal.siteName}
//         description={strapiGlobal.siteDescription}
//       />
//       <main>
//         <ArticlesGrid articles={allStrapiArticle.nodes} />
//       </main>
//     </Layout>
//   )
// }

// export default IndexPage




import React from "react";
import { graphql, Link } from "gatsby";

const IndexPage = ({ data }) => {
  const { edges } = data.allStrapiBlog;

  return (
    <div>
      <h1>Blogs by Iothings</h1>
      {edges.map(({ node }) => {
        const { title, date, description, cover } = node;
        // const image = getImage(cover.localFile);

        return (
          <div key={node.id}>
            <Link to={`/${node.slug}`}>
              {/* <GatsbyImage image={image} alt={title} /> */}
              {node.image && (
                <img src={node.image} alt="Contact Image" />
              )
              }
              <h2>{title}</h2>
              <h2>{description}</h2>
            </Link>
            {/* <p>{excerpt}</p> */}
            <p>{date}</p>
          </div>
        );
      })}
    </div>
  );
};

export const query = graphql`
  query {
    allStrapiBlog {
      edges {
        node {
          id
          title
          createdAt(formatString: "YYYY MMMM DD")
          image
          slug
          blocks {
            childStrapiComponentSharedRichTextBodyTextnode {
              body
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;



