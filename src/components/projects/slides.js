import React, { useState, Fragment } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import Img from "gatsby-image"


const Slides = ({project}) =>{
    let dir = project.split(' ').join('').toLowerCase()
    const [index, setIndex] = useState(0);
    const data = useStaticQuery(graphql`
        query
        {
            allFile(filter:{extension:{regex:"/(jpeg|jpg|gif|png)/"}, sourceInstanceName:{eq:"screenshots"}}) {
              edges {
                node {
                  childImageSharp {
                    fluid(maxWidth: 4000) {
                        src
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        `
    )
    let IMGdata = data.allFile.edges.filter((edge)=>edge.node.childImageSharp.fluid.src.includes(dir))

    return (
        <div className="slides">
            {(()=>{
                if(IMGdata.length){
                    return <Img fluid={IMGdata[index || 0].node.childImageSharp.fluid} />
                }
                else{
                    return <h2>No Images</h2>
                }
            })()}
            <button className="left" onClick={()=>index !== 0 ? setIndex(index-1) : setIndex(IMGdata.length-1)} >
                <TiArrowLeftOutline />
            </button> 
            <button className="right" onClick={()=>index !== IMGdata.length-1 ? setIndex(index+1) : setIndex(0)} >
                <TiArrowRightOutline />
            </button> 
        </div>
    )
}

export default Slides