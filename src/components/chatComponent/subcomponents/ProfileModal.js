import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Link } from 'react-router-dom';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ProfileModal({handleMenuClose, user}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className='text-lg w-full'  onClick={handleClickOpen}>
      <img className='w-12 h-12 rounded-full object-cover object-center border-2 border-orange-400' alt="" src={`${user?.image}`} />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <img className='w-16 h-16 rounded-full object-cover object-center border-2 border-orange-400' alt="" src={`${user?.image}`} />
        </DialogTitle>
        <DialogContent className=''>
          <DialogContentText>
          {user?.name}
          </DialogContentText>
          <DialogContentText>
          {user?.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className='pr-4' autoFocus onClick={handleClose}>
            Cancel
          </button>
          <Link to={`/profile/blogger/${user?.id}`} onClick={handleClose}>Go to profile</Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
