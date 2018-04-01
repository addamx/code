import React, { Children } from "react";
import styled from "styled-components";

import buttonStyles from "./buttonStyles";
import Wrapper from "./Wrapper";

export default props => {
  const StyledButton = styled.button`
    ${buttonStyles};
  `;

  let button = (
    <a href={props.href}>
      {Children.toArray(props.children)}
    </a>
  );

  if (props.onClick) {
    button = (
      <StyledButton onClick={props.onClick}>
        {Children.toArray(props.children)}
      </StyledButton>
    );
  }

  return <Wrapper>{button}</Wrapper>;
};


