import { useEffect, useState } from "react";

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

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function Settings() {

  const [myName, setName] = useState("");
  const [myEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");


/*---------------------------------------------------------------------------------------------*/
  const handelNewUser = () => {
    if (!myName || !myEmail)
      return alert("please make sure to fill all fields");
 
      if (myName.length <3)
      return alert(
        "please make sure to password more than 6  & name more than 3"
      );
    let obj ;
   if(password){

   if ( password.length < 6){
   return alert(
     "please make sure to password more than 6  & name more than 3"
   );}

   obj = {
    name: myName,
    email: myEmail,
    password: password,
  };
  }
    else{
    obj = {
            name: myName,
            email: myEmail,
          }; 
    }
    axios
      .put("http://137.184.157.109:8080/changeone", obj, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data)
        getdata();
      });
  };

/*---------------------------------------------------------------------------------------------*/

  const getdata = () => {
   
    axios
    .get(`http://137.184.157.109:8080/getone`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setName(response.data.name)
      setEmail(response.data.email)
 
    });
  };
/*---------------------------------------------------------------------------------------------*/
  useEffect(() => {
    getdata();
  }, []);

/*---------------------------------------------------------------------------------------------*/

 

  return (
    <Page title="User | TuwaiqAuth">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableBody>
            
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell component="th" scope="row" padding="2">
                    <h6> Update only the fields you need  </h6>
                    <br/>
                      <TableRow>
                      <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Name
                      </InputGroup.Text>
          
                      <FormControl
                        value={myName}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                      
                    </InputGroup>
                    </TableRow>
                    <TableRow>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Email
                      </InputGroup.Text>
                      <FormControl
                        value={myEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                    </TableRow>
                    <TableRow>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        {" "}
                        Set Password
                      </InputGroup.Text>
          
                      <FormControl
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                      />
                    </InputGroup>
                    </TableRow>
                    <br/>
                    <TableRow>
                    <Button variant="secondary" onClick={()=> handelNewUser()}>    
                     Save changes
                    </Button>
                    </TableRow>                            
                    </TableCell>
           
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

   
    </Page>
  );
}
