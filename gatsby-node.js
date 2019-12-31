/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

 
const path = require('path')

exports.createPages = ({actions, graphql}) => {
  const createPage = actions.createPage
  const blogPostComponent = path.resolve('src/components/blog/blogPost.js'); 
  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
          }
        }
      }
    }
  }`)
  .then(res => {
    res.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostComponent
      })
    })

  })
}