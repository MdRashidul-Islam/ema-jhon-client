import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyled>
      <div className="footer">
        <div className="first">
          <h3>Get to Know Us</h3>
          <p>Careers</p>
          <p>Blog</p>
          <p>About Amazon</p>
          <p>Investor Relations</p>
          <p>Amazon Devices</p>
          <p>Amazon Science</p>
        </div>
        <div className="second">
          <h3>Make Money with Us</h3>
          <p>Sell products on Amazon</p>
          <p>Sell on Amazon Business</p>
          <p>Sell apps on Amazon</p>
          <p>Become an Affiliate</p>
          <p>Advertise Your Products</p>
          <p>Self-Publish with Us</p>
          <p>Host an Amazon Hub</p>
          <p>SSee More Make Money with Us</p>
        </div>
        <div className="third">
          <h3>Amazon Payment Products</h3>
          <p>Amazon Business Card</p>
          <p>Shop with Points</p>
          <p>Reload Your Balance</p>
          <p>Amazon Currency Converter</p>
        </div>
        <div className="fourth">
          <h3>Let Us Help You</h3>
          <p>Amazon and COVID-19</p>
          <p>Your Account</p>
          <p>Your Orders</p>
          <p>Shipping Rates & Policies</p>
          <p>Returns & Replacements</p>
          <p>Manage Your Content and Devices</p>
          <p>Amazon Assistant</p>
          <p>Help</p>
        </div>
      </div>
    </FooterStyled>
  );
};

const FooterStyled = styled.div`
  min-height: 50vh;
  background: #232f3e;
  color: white;
  .footer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding-top: 40px;
    @media (max-width: 700px) {
      display: flex;
      flex-direction: column;
      text-align: center;
      .first,
      .second,
      .third,
      .fourth {
        margin-bottom: 20px;
      }
    }
    h3 {
      margin-bottom: 10px;
    }
    p {
      margin-bottom: 4px;
    }
  }
`;

export default Footer;
