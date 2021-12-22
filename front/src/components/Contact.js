import {  useState } from "react";

import { InputGroup, FormControl,  Button } from "react-bootstrap";

// material
import {
  Card,
  Table,
  Stack,

  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from "@mui/material";
// components
import Page from "../components/Page";
import Scrollbar from "../components/Scrollbar";


//
import axios from "axios";







const Contact = () => {
  const width = window.innerWidth;

  const [showSucessMesaage, setShowSucessMesaage] = useState(true);
  

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");


  const handelNewUser = () => {
    if ( !companyName || !companyUrl  || !email  || !phone )
      return alert("please make sure to fill all fields");


  const obj = {
  
    company:companyName,
    email: email,
    phone:phone,
    url:companyUrl
   
  };

  

    axios
      .post("/orders", obj)
      .then((response) => {
        console.log(response.data)
       setCompanyName("")
       setCompanyUrl("")
       setPhone("")
       setEmail("")
       setShowSucessMesaage(false)
       setTimeout(()=> setShowSucessMesaage(true),3000)
  
      });
  };

  

  return <Page title="User | TuwaiqAuth" id="contact" style={{marginTop:"2%"}}>
  <Container    >

    <Stack

      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Typography variant="h2" gutterBottom data-aos={width >= 1400 ? "fade-right" : "fade-up"}>
        Get in touch 
      </Typography>
    </Stack>

    <Card >
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }} >
          <Table>
            <TableBody>
           
                <TableCell padding="checkbox"></TableCell>
                <TableCell component="th" scope="row" padding="1">
                <h6 > Let us made it for you , send your company information and we will contact you within 1-3 days  </h6>

                <img  src="https://static.vecteezy.com/system/resources/previews/001/879/565/non_2x/verify-for-safety-protection-and-security-quality-guarantees-survey-to-submit-claims-on-insurance-simple-tick-symbol-illustration-for-landing-page-web-banner-mobile-apps-flyer-poster-ui-free-vector.jpg" alt={""} width={600}/>
                </TableCell>

                <TableCell component="th" scope="row" padding="2">
                <h6 hidden={showSucessMesaage}   style={{color:'green'}}> Thanks for applying we will contact you soon   </h6>
                <h4 > Company Information  </h4>

                <br/>
         
                <TableRow>
                  
                <InputGroup className="mb-5">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Company Name 
                </InputGroup.Text>
    
                <FormControl
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Garden Company"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
                
              </InputGroup>
              </TableRow>
                <TableRow>
                <InputGroup className="mb-5">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Email
                  </InputGroup.Text>
                  <FormControl
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@garden.com"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>
                </TableRow>
                <TableRow>
                <InputGroup className="mb-5">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    {" "}
                  Phone
                  </InputGroup.Text>
      
                  <FormControl
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0555555555"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>
                </TableRow>
                <TableRow>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    {" "}
                   Website URL
                  </InputGroup.Text>
      
                  <FormControl
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    placeholder="www.google.com"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </InputGroup>
                </TableRow>
                <br/>
                <TableRow>
                <Button style={{width:300}} variant="primary" onClick={()=> handelNewUser()}>    
                Submit 
                </Button>
                </TableRow>                            
                </TableCell>
           
                
       
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>

    <br/>
    <br/>
    <h3 style={{textAlign:'center',fontSize:30,marginTop:"2%"}} data-aos={width >= 1400 ? "fade-right" : "fade-up"}>Our Partners</h3>

    <div className="row">
    <div className="col">
    
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}} data-aos={width >= 1400 ? "fade-right" : "fade-up"}>
       <img style={{margin:"2%"}} src="https://origins.nu/wp-content/uploads/pngfind.com-tree-logo-png-2660740-1.png" alt={""} width={80} height={80} />
       <img style={{margin:"2%"}} src="https://origins.nu/wp-content/uploads/pngfind.com-tree-logo-png-2660740-1.png" alt={""} width={80} height={80} />
       <img style={{margin:"2%"}} src="https://origins.nu/wp-content/uploads/pngfind.com-tree-logo-png-2660740-1.png" alt={""} width={80} height={80} />
       <img style={{margin:"2%"}} src="https://origins.nu/wp-content/uploads/pngfind.com-tree-logo-png-2660740-1.png" alt={""} width={80} height={80} />


      </div>
    </div>

    <footer><hr/><p style={{textAlign:'center'}}>Made with 🌳 by Abdulsalam</p></footer>
  
 
  </div>

  </Container>
  <br/>
  <br/>

  


</Page>
};

export default Contact;