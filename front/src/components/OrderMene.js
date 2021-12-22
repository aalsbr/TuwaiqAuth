import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import axios from "axios";

// ----------------------------------------------------------------------

export default function OrderMenue({id,getdata,company,email}) {
  const ref = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handelMarked = ()=>{

    const obj = {
      company:company,
      email:email ,
    }

  axios
    .put(`http://137.184.157.109orders/mark/${id}`,{status:"done"} , {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      
      axios
      .post(`http://137.184.157.109:8080/orders/company`, obj , {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        getdata()
        console.log("this is respspsppspsspps",response)
        setIsOpen(false)
  
      }).catch((err)=>{
        console.log(err);

      });
   
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
       
        <MenuItem
          component={RouterLink}
          to="#"
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Mark as Done "
            primaryTypographyProps={{ variant: "body2" }}
            onClick={()=>handelMarked()}
          />
     
        </MenuItem>
      </Menu>


   





  
    </>
  );
}

