import { Alert as AlertMui, Snackbar } from "@mui/material";

interface IAlert {
  open: boolean;
  message: string | '';
  type: 'success' | 'error' | undefined;
  handleClose: () => void;
}

export default function Alert({ open, message, type, handleClose }: IAlert) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      onClose={handleClose}    
      autoHideDuration={3000}
    >

      <AlertMui
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </AlertMui>

    </Snackbar>
  )
}