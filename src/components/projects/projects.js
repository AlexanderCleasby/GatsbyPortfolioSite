import React from "react"
import {StaticQuery, graphql} from "gatsby"
import Project from './project'


const Projects = () => (
  <React.Fragment>
  <h1 className="sectionHeader">Projects:</h1>
  <StaticQuery 
    query={graphql`
      query projectsQuery
      {
        allProjectsJson {
          nodes {
            description
            name
            stack
            repo
            live
          }
        }
      }
    `}
    render={data=>data.allProjectsJson.nodes.map((project,i)=><Project key={i} project ={project} />)}
  />

  </React.Fragment>
  )


export default Projects
