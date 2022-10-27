import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';

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

export default function Quickview({ recipe }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addRecipe = async (recipeid) => {
    // console.log("quick",recipeid)
    const res = axios
      .post(`${process.env.REACT_APP_API}/recipes/addRecipe/${recipeid}`,{withCredentials: true})
      .then(function (response) {
        
      })
      .catch((err) => console.log("addRecipe hatası"));

    toast.promise(res, {
      loading: "kaydediliyor...",
      success: "Tarif başarılı bir şekilde kaydedildi",
      error: "Bir hata oluştu",
    });
  };

  return (
    <div className="flex justify-end" >
        <Toaster position="bottom-right" reverseOrder={false} />
      <button className=""  onClick={handleClickOpen}>
        <VisibilityIcon fontSize="medium" className="text-gray-600" />
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <div className="text-indigo-600 font-bold">
            {recipe.title}
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            
              <div className="font-bold text-orange-400">içindekiler</div>
              <div>
                <ul>
                  <li>1kg un</li>
                  <li>1 kaşık tuz</li>
                  <li>1 bardak sıvı yağ</li>
                  <li>1 paket kapartma tozu</li>
                </ul>
              </div>
              <div className="font-bold text-orange-400 pt-4">sosu için</div>
              <div>
                <ul>
                  <li>1 paket yağ</li>
                  <li>1 kaşık tuz</li>
                  <li>1 bardak sıvı yağ</li>
                  <li>yarım bardak yoğurt</li>
                </ul>
              </div>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            çık
          </Button>
          <Button
            onClick={() => {
              addRecipe(recipe._id)
              handleClose()
            }}
          >
            profile kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
