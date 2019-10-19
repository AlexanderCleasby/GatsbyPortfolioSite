import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from './logo'
import Monitor from "./monitor";
import './header.scss'

const Header = ({ siteTitle }) => (
  <header>
    
    <h1 className="siteTitle">{siteTitle}</h1> 
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
