import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { FaGithub } from 'react-icons/fa'
import './header.scss'

const Header = ({ siteTitle, github }) => (
  <header>
    <h1 className="siteTitle">{siteTitle}  </h1>
    <ul className="subheader">
      <li><a href={github}><FaGithub />Check out my code</a></li>
      
      <li>Washington D.C.</li>
    </ul>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
