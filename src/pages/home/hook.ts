import styled from "styled-components";

export default function useCarousel() {
  const Styled = {
    itemBox: styled.img`
      width: 100%;
    `
  };
  return { Styled };
}
