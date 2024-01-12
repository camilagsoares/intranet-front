import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";


export const Container = styled.div`
position: relative;
width: 400px; 
`;

export const ContainerInput = styled.input`
font-size: 15px;
padding: 5px 10px;
width: 100%;
padding-left: 32px;
outline: none;
background: #FFFFFF;
color: #000000;
border: 1px solid #C4D1EB;
border-radius: 5px;
box-shadow: 3px 3px 2px 0px #E2E2E2;
transition: .3s ease;

    &:focus {
     background: #F9FBFC;
	border: 1px solid #5A7EC7;
	border-radius: 10px;
  }

  &::placeholder {
    color: #999; 
  }


`

export const SearchIcon = styled(IoMdSearch)`
position: absolute;
top: 50%;
left: 10px; 
transform: translateY(-50%);
color: #999;
`;


export const AlignContainerCenter = styled.div`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`

export const ContainerLogin = styled.div`
background: white;
box-shadow: 0 0.250em 0.375em rgba(50,50,93,.09), 0 0.063em 0.188em rgba(0,0,0,.08);
border-radius: 4px;
width: 600px;
padding: 10px;
`