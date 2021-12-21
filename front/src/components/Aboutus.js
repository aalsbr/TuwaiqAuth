import React from "react";

import styled from "styled-components";



const Section = styled.section`

`;
const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 300;
  line-height: normal;
  color: #1b5cce;
  text-align: center;
  margin-bottom: 2px;
`;



const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 30px;
  &:hover {
    transform: translateY(-5px) !important;
  }

  @media (min-width: 992px) {
    margin-bottom: 0;
  }
`;





const Text = styled.p`
  font-size: 18px;
  font-weight: normal;
  line-height: 1.58;
  color: #8f8f8f;
  margin-bottom: 0;
  max-width: 1000px;
`;

const Aboutus = () => {
  const width = window.innerWidth;
  return (
    <Section id="about">

      <div className="container">

        <SectionTitle data-aos={width >= 1400 ? "fade-right" : "fade-up"}>About us</SectionTitle>
        <br/>
        <br/>
        <div className="row">
          <div className="col">
     
            <Box data-aos={width >= 1400 ? "fade-right" : "fade-up"}>
            <Text>TuwaiqAuth was founded by Abdulsalam in 2021. 
            The project aims to solve authentication issues for small
             projects by creating login & register pages for them with custom styles  </Text>
            </Box>
          </div>
        
       
        </div>
   
      </div>
   
  
    </Section>
  );
};

export default Aboutus;
