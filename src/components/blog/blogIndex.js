import React, {Fragment} from 'react'
import { StaticQuery,graphql } from 'gatsby'
import { FaArrowRight } from 'react-icons/fa'
import './blog.scss'

const blogIndex = () => (
    <div className="blog">
        <StaticQuery 
            query={allBlogPosts}
            render={data=>data.allMarkdownRemark.edges.map(edge=>edge.node.frontmatter).map((post)=><BlogSummary post={post} />)
            }
        />
    </div>
)

const BlogSummary = ({post}) => (
  <div className="body">
    <h2 className="blogTitle">{post.title}</h2>
    <p>{post.summary}</p>
    <div className="goToBlog">
      <a href={post.path}>GO<FaArrowRight /></a>
    </div>
  </div>
  )

const allBlogPosts = graphql`
    query allBlogPosts{
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                summary
                date(locale: "")
                title
                path
              }

            }
          }
        }
      }
`

export default blogIndex
