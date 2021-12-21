import React from "react";

import styled from "styled-components";

import Demo from "./Icons/Demo";

const Section = styled.section`
  padding: 5px 0 0px;
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

const IconWrap = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 150px;
  border: solid 1px #eff2f9;
  background-color: #f8faff;
  margin-bottom: 30px;
  position: relative;
  > svg {
    transition: all 0.3s ease-in;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    > svg {
      transform: translate(-50%, -50%) rotateY(360deg);
    }
  }
`;

const BoxTitle = styled.h4`
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #5273c7;
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: normal;
  line-height: 1.58;
  color: #8f8f8f;
  margin-bottom: 0;
  max-width: 350px;
`;

const Features = () => {
  const width = window.innerWidth;
  return (
    <Section >
      <div className="container">
        <SectionTitle>Feautres</SectionTitle>
        <br/>
        <div className="row">
          <div className="col-lg-4">
            <Box data-aos={width >= 1400 ? "fade-right" : "fade-up"}>
              <IconWrap>
                <Demo />
              </IconWrap>
              <BoxTitle>Availability</BoxTitle>
              <Text>
        The availability and responsiveness of a website is a high priority for many business.  Disruption of website availability for even a short time can lead to loss of revenue, customer dissatisfaction and reputation damage. 
              </Text>
            </Box>
          </div>
          <div className="col-lg-4">
            <Box data-aos="fade-up">
              <IconWrap>
                <Demo />
              </IconWrap>
              <BoxTitle>Confidentiality</BoxTitle>
              <Text>
              Confidentiality measures protect information from unauthorized access and misuse.  Most information systems house information that has some degree of sensitivity. 
              </Text>
            </Box>
          </div>
          <div className="col-lg-4">
            <Box data-aos={width >= 1400 ? "fade-left" : "fade-up"}>
              <IconWrap>
                <Demo />
              </IconWrap>
              <BoxTitle>Integrity</BoxTitle>
              <Text>
              As with confidentiality protection, the protection of data integrity extends beyond intentional breaches.  Effective integrity countermeasures must also protect against unintentional alteration. 


              </Text>
            </Box>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
