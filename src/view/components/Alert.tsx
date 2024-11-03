import { Alert as AlertMui, Snackbar } from "@mui/material";

interface IAlert {
  open: boolean;
  message: string | '';
  type: string | '';
}

export default function Alert({ open, message, type }: IAlert) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={5000}
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