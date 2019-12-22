import React from 'react'
import Stack from './stack'
import Slides from './slides'
import Links from './links'

const Project =({project})=>{
    
    return <div className="project">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <Slides project={project.name} />
        <Stack stack={project.stack} />
        <Links github={project.repo} live={project.live} />
    </div>
}

export default Project