import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import "./user.css"
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { Modal,Button, InputGroup, FormControl, Form } from "react-bootstrap";

// ----------------------------------------------------------------------

export default function UserMoreMenu({id, name,email,role,getdata}) {
  const ref = useRef(null);
  const [modalShow, setModalShow] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [myName, setName] = useState(name);
  const [myEmail, setEmail] = useState(email);
  const [myRole, setRole] = useState(role);
  const [password, setPassword] = useState("");
  const handelEdit = ()=>{

  let obj;  
  if(!myEmail||!myName) return alert("email && name should not be empty ")
  if(password) { 
  if(password.length<6)return alert("password must be 6 character or more ")
  obj = {
   name:myName,
   email:myEmail,
   role:myRole,
   password:password,
  };
}
  else{
    obj = {
      name:myName,
      email:myEmail,
      role:myRole,
     };
  }
  axios
    .put(`http://137.184.157.109:8080/updateinfo/${id}`, obj, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      getdata()
      setModalShow(false)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handelDelete = ()=>{
    axios
    .delete(`http://137.184.157.109:8080/${id}`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      getdata()
      
    })
    .catch((error) => {
      console.log(error);
    });
  }
  





  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ color: "text.secondary" }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
            onClick={()=>handelDelete()}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}

            onClick={()=>setModalShow(true)}
          />
     
        </MenuItem>
      </Menu>


      <Modal
      show={modalShow}
      onHide={()=>setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         User Edit 
        </Modal.Title>
     
     
      </Modal.Header>
      <Modal.Body>
      <p>Update only that fields that you need  </p>
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
    <InputGroup.Text id="inputGroup-sizing-default">Role</InputGroup.Text>
    <Form.Select aria-label="Default select example" value={myRole} onChange={(e)=>setRole(e.target.value)} >
    <option value="admin">Admin</option>
    <option value="Normail User">Normal User</option>
  </Form.Select>
    </InputGroup>
    <InputGroup className="mb-3">
    <InputGroup.Text id="inputGroup-sizing-default">Set New Password</InputGroup.Text>

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
        <Button onClick={()=>handelEdit()}>Save Changes</Button>
      </Modal.Footer>
    </Modal>





  
    </>
  );
}

