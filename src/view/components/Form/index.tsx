/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid2 as Grid } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, z } from './validateZod'
import { HttpClient } from '../../../config/http_client';
import { convertTo } from '../../../utils/converToUrlSeachParams';
import { useState } from 'react';
import Alert from '../Alert';

export type FormData = z.infer<typeof formSchema>;

export default function Form() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  const onSubmit = async (data: FormData) => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('empresa:'));
    const todos = keys.map(key => JSON.parse(localStorage.getItem(key)));

    todos.filter(({ cnpj }) => {
      if (!cnpj.includes(data.cnpj)) {
        // localStorage.setItem(`empresa:${self.crypto.randomUUID().substring(30)}`, JSON.stringify(data));
      }
    })

    const { cnpj, company_name, complement, nighborhood, trade_name, state, ...rest } = data;
    const params = convertTo(rest)

    try {
      const response = await HttpClient.Get(`/search?${params}&format=geojson&limit=1&addressdetails=1`);
      const result = await response.json();

      console.log(!response.ok);

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      if (result.features.length <= 0) {
        setAlert(true);
        setMessage('Erro ao salvar');
        setType('error');
      }

      const new_data = result.features.map(({ geometry }: { [key: string]: any }) => (
        {
          coordinates: geometry?.coordinates,
        }
    ));

      const nova = { ...data, location: new_data[0]?.coordinates?.reverse() || [] }

      localStorage.setItem(`empresa:${self.crypto.randomUUID().substring(30)}`, JSON.stringify(nova));

      setAlert(true);
      setMessage('Criado com sucesso');
      setType('success');
      reset();

    } catch (error) {
      console.log(error);
    } finally {
      setAlert(false);
    }
  };

  return (
    <>
      <Alert open={alert} message={message} type={type} />

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
                label="Bairro"
                placeholder="Digite o bairro"
                {...register("nighborhood")}
                error={!!errors.nighborhood}
                helperText={errors.nighborhood?.message}
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
          </Grid>
          <Grid size={4}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              color="success"
              type='submit'
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>

  );
}
