import React from 'react'
import { FaJs, FaReact, } from 'react-icons/fa'
import Rails from '../../images/stackIcons/railsIcon.svg'
import Postgres from '../../images/stackIcons/postgresqlIcon.svg'
import NodeJS from '../../images/stackIcons/nodejsIcon.svg'
import MongoDB from '../../images/stackIcons/mongodbIcon.svg'
import "./projects.scss"

const getIcon = icon=>{
    switch (icon){
        case 'javascript':
            return <FaJs style={{color:"yellow"}} />
        case 'react':
            return <FaReact style={{color:"lightblue"}} />
        case 'rails':
            return <Rails style={{color:"red"}} />
        case 'postgres':
            return <Postgres style={{color:"#336791"}} />
        case 'node js':
            return <NodeJS />
        case 'mongoDB':
            return <MongoDB />
        default:
            return <a />}   
}

const format = (item)=>`${item.substring(0,1).toUpperCase()}${item.substring(1,item.length)}`

const Stack =({stack})=>(
    <div className="stack">
        Built with:
        <br />
        {stack.map((item)=>(
            <div>
                {format(item)} {getIcon(item)}
            </div>)
        )}
    </div>
)

export default Stack