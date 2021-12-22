import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Modal, InputGroup, FormControl } from "react-bootstrap";


// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListHead, UserMoreMenu } from '../components/_dashboard/user';

//
import axios from 'axios';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'last seen', label: 'Last Seen', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function User() {

  


  const [page, setPage] = useState(0);
  const [myuserList, setUserList] = useState({});
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //modal
  const [modalShow, setModalShow] = useState(false);
  const [myName, setName] = useState("");
  const [myEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handelNewUser = ()=>{
    if(!myName||!myEmail||!password) return alert("please make sure to fill all fields")
    if(myName.length<3||password.length<6) return alert("please make sure to password more than 6  & name more than 3")

    const obj  = {
      name:myName,
      email:myEmail,
      password:password
    }
    axios
    .post("http://137.184.157.109:8080/newuser", obj,{ 
       headers: {
      "x-access-token": localStorage.getItem("token"),
    }
  })
    .then((response) => {
      console.log(response);
      setModalShow(false)
      getdata()
 
  })
  }

  const getdata  = ()=>{

    axios.get("http://137.184.157.109:8080/getall").then((res) => {
  
    if(res.data.data){
    console.log(res.data.data)
    setUserList(res.data.data)  
  
    }
  });
  }
 

  useEffect(()=>{
    getdata()
  },[])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myuserList.length) : 0;


  const isUserNotFound = myuserList.length === 0;

  return (
    <Page title="User | TuwaiqAuth">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={()=>setModalShow(true)}
            startIcon={<Icon icon={plusFill} />}

          >
            New User
          </Button>
        </Stack>

        <Card>
        

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={myuserList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {myuserList.length&& myuserList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                      
                      const { _id, name, email,date,role, avatarUrl } = row;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                       
                        >
                          <TableCell padding="checkbox">
                        
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                         
                        

                          <TableCell align="right">
                            <UserMoreMenu id={_id} name={name} role={role} email={email} getdata={getdata}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={myuserList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>


      <Modal
      show={modalShow}
      onHide={()=>setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Add User 
        </Modal.Title>
     
     
      </Modal.Header>
      <Modal.Body>
      <InputGroup className="mb-3">
      <InputGroup.Text id="inputGroup-sizing-default">Name</InputGroup.Text>

    <FormControl
    value={myName}
    onChange={(e)=>setName(e.target.value)}
      placeholder="Name"
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
    />
    </InputGroup>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
    <FormControl
     value={myEmail}
     onChange={(e)=>setEmail(e.target.value)}
      placeholder="Email"
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
    />
    </InputGroup>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default"> Password</InputGroup.Text>

    <FormControl
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
      placeholder="Password"
      aria-label="Default"
      aria-describedby="inputGroup-sizing-default"
    />
    </InputGroup>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>handelNewUser()}>Add </Button>
      </Modal.Footer>
    </Modal>
    </Page>
  );
}
