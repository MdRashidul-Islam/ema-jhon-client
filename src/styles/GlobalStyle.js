import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;

  ::-webkit-scrollbar{
    width: 5px;
    background-color: #FFF8F5;
}
::-webkit-scrollbar-thumb{
    border-radius: 2px;
    background-color: #fb9705;
}
::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #FFF8F5;
}
}
body{
/* overflow: hidden; */
font-family: 'Poppins', sans-serif;
  a{
    color:black;
   
  }
  button {
        padding: 10px 60px;
        margin: 10px 0px;
        border: none;
        background: #f3a847;
        color: white;
        border-radius: 3px;
        cursor: pointer;
      }
}
`;
