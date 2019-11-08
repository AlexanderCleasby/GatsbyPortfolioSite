import React from 'react'
import Stack from './stack'
import Slides from './slides'

const Project =(props)=>{
    return <div className="project">
        <h3>{props.project.name}</h3>
        <p>{props.project.description}</p>
        <Slides project={props.project.name} />
        <Stack stack={props.project.stack} />
    </div>
}

export default Project