import React from "react";
import Shop from "../components/Shop/Shop";
import styled from "styled-components";
import Footer from "../components/common/Footer";

const HomePage = () => {
  return (
    <HomePageStyled>
      <Shop />
      <Footer />
    </HomePageStyled>
  );
};

const HomePageStyled = styled.div``;

export default HomePage;
