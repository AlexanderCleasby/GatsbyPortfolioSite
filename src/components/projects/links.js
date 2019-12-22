import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { GoBrowser } from "react-icons/go";

const Links = (props)=>{
    const GithubLink=()=>{
        if(props.github){
            return <div>
                <a href={props.github}>
                    <FaGithub />{" "}
                    See the repository 
                </a>
            </div>
        }
    }
    const LiveLink=()=>{
        if(props.live){
            return <div>
                <a href={props.live}>
                    <GoBrowser />{" "}
                    See Live Deployment
                </a>
            </div>
        }
        else{
            return ""
        }
    }
    return <div className="projectLinks">
      <GithubLink /><LiveLink />
    </div>
}
export default Links