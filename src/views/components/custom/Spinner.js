import { css } from "@emotion/react";
import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  let [color, setColor] = useState("#FF9900");
  return (
    <SpinnerStyled>
      <div>
        <HashLoader color={color} css={override} size={100} />
      </div>
    </SpinnerStyled>
  );
};

const SpinnerStyled = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Spinner;
