import React from 'react'
import Logo from "./logo"
import './monitor.scss'

const Mointor = ()=>{

    return (
    <React.Fragment>
        <div className="macintosh">
            <div className="top">
                <div className="screen">
                    <Logo letter="A" />
                </div>
            </div>
            <div className="lower">
                <div className="apple" />
                <div className="floppy"></div>
            </div>
        </div>
        <div className="base" />

    </React.Fragment>)
}

export default Mointor