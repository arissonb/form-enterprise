import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid2 as Grid } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, z } from './validateZod'
import { HttpClient } from '../../../config/http_client';
import { convertTo } from '../../../utils/converToUrlSeachParams';
import Alert from '../Alert';

export type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState<'success' | 'error'>()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => setAlert(false);
  const onSubmit = async (data: FormData) => {

    const { cnpj, company_name, complement, nighborhood, trade_name, state, ...rest } = data;
    const params = convertTo(rest)

    try {

      setAlert(true);
      const response = await HttpClient.Get(`/search?${params}&format=jsonv2&limit=1&addressdetails=1`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      if (result.length <= 0) {
        setType('error');
        setMessage('Endereço não encontrado');
        return
      }

      const coordinates = result.map(({ lat, lon }: { lat: number, lon: number }) => [lat, lon]);
      const new_data = { ...data, location: coordinates[0] || [] }

      localStorage.setItem(`empresa:${self.crypto.randomUUID().substring(30)}`, JSON.stringify(new_data));
      setType('success');
      setMessage('Criado com sucesso');
      reset();

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <Alert open={alert} message={message} type={type} handleClose={handleClose} />

      <Box sx={{ flexGrow: 1 }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid size={12}>
          <Grid container spacing={2}>
            <Grid size={7}>
              <TextField
                fullWidth
                label="Razão Social"
                placeholder="Digite a razão social"
                {...register("company_name")}
                error={!!errors.company_name}
                helperText={errors.company_name?.message}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                fullWidth
                label="Nome Fantasia"
                placeholder="Digite o nome fantasia"
                {...register("trade_name")}
                error={!!errors.trade_name}
                helperText={errors.trade_name?.message}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                fullWidth
                label="CNPJ"
                placeholder="Digite o CNPJ ou CPF"
                {...register("cnpj")}
                error={!!errors.cnpj}
                helperText={errors.cnpj?.message}
              />
            </Grid>

            <Grid size={2}>
              <TextField
                fullWidth
                label="Cep"
                placeholder="Digite o cep"
                {...register("postalcode")}
                error={!!errors.postalcode}
                helperText={errors.postalcode?.message}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                fullWidth
                label="Estado"
                placeholder="Digite o estado"
                {...register("state")}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                fullWidth
                label="Cidade"
                placeholder="Digite a cidade"
                {...register("city")}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

            <Grid size={2}>
              <TextField
                fullWidth
                label="País"
                placeholder="Digite o país"
                {...register("country")}
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                fullWidth
                label="Rua"
                placeholder="Digite a rua"
                {...register("street")}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            </Grid>

            <Grid size={5}>
              <TextField
                fullWidth
                label="Bairro"
                placeholder="Digite o bairro"
                {...register("nighborhood")}
                error={!!errors.nighborhood}
                helperText={errors.nighborhood?.message}
              />
            </Grid>

            <Grid size={3}>
              <TextField
                fullWidth
                label="Numero"
                placeholder="Digite o numero"
                {...register("number")}
                error={!!errors.number}
                helperText={errors.number?.message}
              />
            </Grid>

            <Grid size={9}>
              <TextField
                fullWidth
                label="Complemento"
                placeholder="Digite o complemento"
                {...register("complement")}
                error={!!errors.complement}
                helperText={errors.complement?.message}
              />
            </Grid>

            <Grid size={4}>
              <Button
                variant="contained"
                sx={{ mt: 1, ml: 1 }}
                color="success"
                type='submit'
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
          
        </Grid>
      </Box>
    </>
  );
}
