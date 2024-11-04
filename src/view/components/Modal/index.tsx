import { Typography, Modal as ModalMui, Box, TextField, Grid2 as Grid } from '@mui/material';
import { ICompany } from '../../../entities/ICompany';
import { style } from './styleModal';

interface IMap {
  company: ICompany | undefined;
  openModal: boolean;
  handleClose: () => void;
}

export default function Modal({ openModal, company, handleClose }: IMap) {
  return (
    <ModalMui
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography gutterBottom variant="h5" id="modal-modal-title" component="div">
          {company?.company_name}
        </Typography>

        <Grid size={12}>
          <Grid container spacing={2} id="modal-modal-description">
            <Grid size={7}>
              <TextField
                disabled
                fullWidth
                label="Razao Social"
                defaultValue={company?.trade_name}
              />
            </Grid>
            <Grid size={5}>
              <TextField
                disabled
                fullWidth
                label="Nome Fantasia"
                defaultValue={company?.company_name}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                disabled
                fullWidth
                label="CNPJ"
                defaultValue={company?.cnpj}
              />
            </Grid>

            <Grid size={2}>
              <TextField
                disabled
                fullWidth
                label="CEP"
                defaultValue={company?.postalcode}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                disabled
                fullWidth
                label="Estado"
                defaultValue={company?.state}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                disabled
                fullWidth
                label="Cidade"
                defaultValue={company?.city}
              />
            </Grid>

            <Grid size={2}>
              <TextField
                disabled
                fullWidth
                label="País"
                defaultValue={company?.country}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                disabled
                fullWidth
                label="Bairro"
                defaultValue={company?.nighborhood}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                disabled
                fullWidth
                label="Rua"
                defaultValue={company?.street}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                disabled
                fullWidth
                label="Numero"
                defaultValue={company?.number}
              />
            </Grid>

            <Grid size={9}>
              <TextField
                disabled
                fullWidth
                label="Complemento"
                defaultValue={company?.complement}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalMui>
  );
}
