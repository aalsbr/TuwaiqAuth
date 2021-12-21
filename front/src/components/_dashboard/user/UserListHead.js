
import {  TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------



export default function UserListHead({

  headLabel,
}) {


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
      
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
           
          >
           
              {headCell.label}
          
     
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
