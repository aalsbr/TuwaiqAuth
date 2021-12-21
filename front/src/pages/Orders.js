import { useEffect, useState } from 'react';
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
import { UserListHead } from '../components/_dashboard/user';

//
import axios from 'axios';
import Label from 'src/components/Label';
import OrderMenue from 'src/components/OrderMene';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'company', label: 'Company Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'url', label: 'URL', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

export default function Orders() {

  


  const [page, setPage] = useState(0);
  const [orderList, setOrderList] = useState({});
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //modal
  const [modalShow, setModalShow] = useState(false);
  const [myName, setName] = useState("");
  const [myEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");




  const getdata  = ()=>{

    axios.get("http://localhost:8080/orders",{
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }

    }).then((res) => {
      console.log("this is my data",res)
    if(res.data.data){

    setOrderList(res.data.data)  
  
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



  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;


  const isUserNotFound = orderList.length === 0;

  return (
    <Page title="User | TuwaiqAuth">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Orders
          </Typography>
         
        </Stack>

        <Card>
        

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {orderList.length&& orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                      
                      const { _id, company, email,url,phone,status,avatarUrl } = row;

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
                              <Avatar alt={company} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {company}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{url}</TableCell>
                          <TableCell  align="left">
                          <Label color={status==="pending"?"warning":"success"} children={status[0].toUpperCase() + status.slice(1)
                          }/>
                           </TableCell>
                        
                         
                        

                          <TableCell align="right">
                          { status ==="pending"&& <OrderMenue id={_id} company={company}  email={email} getdata={getdata} />}
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
            count={orderList.length}
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
        <Button >Add </Button>
      </Modal.Footer>
    </Modal>
    </Page>
  );
}
