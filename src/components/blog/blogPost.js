import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Parser from 'html-react-parser';

const BlogPost = ({data}) =>{
    const post = data.markdownRemark
    return <Layout>
        <div className="blog">
          <div className="body">
            <div>
              <h1>{post.frontmatter.title}</h1>
              <div>
                  {post.timeToRead} minute read.
              </div>
              {Parser(post.html)}
            </div>
          </div>
        </div>
    </Layout>
}

export const BlogPostByPath = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path} }) {
      html
      timeToRead
      frontmatter {
        path
        title
      }
    }
  }
`
export default BlogPost
