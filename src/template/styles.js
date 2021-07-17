import styled from 'styled-components';
import {Link} from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import {withTheme} from "@material-ui/core/styles"

//
export const MainLink = styled.h6`
  color: #fff;
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 0;
  letter-spacing: 0.0075em;
  white-space: nowrap;
  text-transform: uppercase;
`

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`

export const MenuLink = styled(Link)`
  text-decoration: none;
`

export const CustomAppBar = styled(AppBar)`
  position: static;
  elevation: 0;
  border-bottom: 1px solid;
`

export const CustomNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

// usando styled-components con material-ui
// referencia: https://stackoverflow.com/a/62859774/7721297
export const CustomFooter = withTheme(styled.footer`
          background-color: ${props => props.theme.palette.background.paper};
          padding: ${props => props.theme.spacing(6)}px;
          margin: 30px 0 30px 0;
    `
);

