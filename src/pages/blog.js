import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Blogs from '../components/blog/blogIndex.js'


const blogPage = () => (
  <Layout>
    <SEO title="Blog" />
    <Blogs />
  </Layout>
)

export default blogPage
