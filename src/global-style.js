import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
${(props) => props.rootStyles}
  *, *:before, *:after {
    box-sizing: border-box;
  }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:var(--primary-text);
  background:var(--primary-bg);

}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

svg{
  cursor: pointer;
  color: var(--icon-primary);
}
::-webkit-scrollbar {
  width: 0px;
}
a{
  text-decoration:none;
}

button{
  cursor:pointer;
}
`;
