import { createGlobalStyle } from "styled-components";

const globalStyle = createGlobalStyle`
        body {
            background: ${(props: any) => props.theme.bgColor};
            color:${(props) => props.theme.fontColor};
            line-height: 1;
        }
`;
export default globalStyle;
