import styled from 'styled-components';
import {Link} from "react-router-dom";

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
`
