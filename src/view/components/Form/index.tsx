import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Grid2 as Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, z } from './validateZod'
import { HttpClient } from '../../../config/http_client';
import { convertTo } from '../../../utils/converToUrlSeachParams';
import Alert from '../Alert';
// mock de todos os estados
import { states as estados } from '../../../mocks/states';
// funcao para tirar os acentos dos valores
import { normalize } from '../../../utils/normalizeString';
// funcao que adiciona mascara no cnpj e cpf
import { formatCpfCnpj } from '../../../utils/formatCnpjCpf';

export type FormData = z.infer<typeof formSchema>;

export default function Form() {
  // variavel state para abrir o modal
  const [alert, setAlert] = useState(false)
  // variavel state para adicionar a mensagem no alerta
  const [message, setMessage] = useState('')
  // variavel state para definir o tipo de alerta
  const [type, setType] = useState<'success' | 'error'>()
  // variavel zod para fazer o registro do formulario
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => setAlert(false)

  // funcao para salvar os dados no localStorage
  const saveLocalStorage = (coordinates: string[], data: FormData) => {
    const new_data = { ...data, location: coordinates[0] || [] }
    // depois que o novo objeto é criado, é salvo os dados da empresa e endereco no localstorage
    localStorage.setItem(`empresa:${self.crypto.randomUUID().substring(30)}`, JSON.stringify(new_data))
  }

  const onSubmit = async (data: FormData) => {
    const { city, country, number, postalcode, street } = data;
    // normalize é uma funcao para tirar os acentos dos valores
    const with_number = number ? `${number} ${normalize(street)}` : normalize(street);
    const newObj = { city: normalize(city), country, postalcode, street: `${with_number}` };
    
    // convertTo é uma funcao converter o objeto para tipo params
    const params = convertTo(newObj)

    try {
      setAlert(true);
      const response = await HttpClient.Get(`/search?${params}&format=jsonv2&limit=1&addressdetails=1`);
      const result = await response.json();

      // é  lancado um erro caso a requisicao nao de certo
      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // se a variavel result estiver vazia, é lancado uma mensagem de erro quando nao é encontrado o endereço
      if (result.length <= 0) {
        setType('error');
        setMessage('Endereço não encontrado');
        return
      }

      // caso o endereço seja encontrado é feito um map para buscar as coordenadas do endereço, e depois salvo em um novo objeto
      const coordinates = result.map(({ lat, lon }: { lat: number, lon: number }) => [lat, lon]);

      saveLocalStorage(coordinates, data)
      setType('success');
      setMessage('Criado com sucesso');

      // funcao reset serve para limprar os campos apos os dados serem salvos
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
                onChange={(e) => {
                  const { value } = e.target;
                  e.target.value = formatCpfCnpj(value);
                }}
                
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
              <FormControl
                variant="outlined"
                style={{ width: "100%", marginBottom: 32 }}
              >
                <InputLabel id="demo-simple-select-helper-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Estado"
                  defaultValue=""
                  {...register("state", { required: true })}
                >
                  {estados.map((value, index) => (
                    <MenuItem key={index} value={value}> {value} </MenuItem>
                  )
                  )}
                </Select>
                {!!errors.state && <span style={{ color: 'red' }} className="formError errorMssg">{errors.state?.message}</span>}
              </FormControl>

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
