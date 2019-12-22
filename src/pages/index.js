import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Projects from '../components/projects/projects'
import Monitor from '../components/monitor'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Monitor />
    <Projects />
  </Layout>
)

export default IndexPage
