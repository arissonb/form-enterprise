import { Typography, Modal as ModalMui, Box, TextField, Grid2 as Grid } from '@mui/material';
import { ILocation } from '../../../entities/ILocation';
import { style } from './styleModal';

interface IMap {
  openModal: boolean;
  handleClose: () => void;
  location: ILocation | undefined;
}

export default function Modal({ openModal, location, handleClose }: IMap) {
  return (
    <ModalMui
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography gutterBottom variant="h5" id="modal-modal-title" component="div">
          {location?.name}
        </Typography>

        <Grid size={12}>
          <Grid container spacing={2} id="modal-modal-description">
            <Grid size={7}>
              <TextField
                disabled
                fullWidth
                label="Razao Social"
                defaultValue={location?.name}
              />
            </Grid>
            <Grid size={5}>
              <TextField
                disabled
                fullWidth
                label="Nome Fantasia"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                disabled
                fullWidth
                label="CNPJ"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={2}>
              <TextField
                disabled
                fullWidth
                label="CEP"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                disabled
                fullWidth
                label="Estado"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                disabled
                fullWidth
                label="Cidade"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={2}>
              <TextField
                disabled
                fullWidth
                label="País"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                disabled
                fullWidth
                label="Bairro"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                disabled
                fullWidth
                label="Rua"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                disabled
                fullWidth
                label="Numero"
                defaultValue={location?.name}
              />
            </Grid>

            <Grid size={9}>
              <TextField
                disabled
                fullWidth
                label="Complemento"
                defaultValue={location?.name}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalMui>
  );
}
