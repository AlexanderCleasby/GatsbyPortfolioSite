import React from "react"
import {StaticQuery, graphql} from "gatsby"
import Project from './project'


const Projects = () => (
  <React.Fragment>
  <h1>Projects:</h1>
  <StaticQuery 
    query={graphql`
      query projectsQuery
      {
        allProjectsJson {
          nodes {
            description
            name
          }
        }
      }
    `}
    render={data=>data.allProjectsJson.nodes.map((project,i)=><Project key={i} project ={project} />)}
  />

  </React.Fragment>
  )


export default Projects
