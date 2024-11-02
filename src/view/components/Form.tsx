// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Grid2 as Grid } from '@mui/material';
// import { HttpClient } from '../../config/http_client';

const formSchema = z.object({
  razao_social: z.string().nonempty("Razao social é obrigatório"),
  nome_fantasia: z.string().nonempty("Nome fantasia é obrigatório"),
  cnpj: z.string({ required_error: 'CPF/CNPJ é obrigatório.' })
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF/CNPJ deve conter apenas números.'),
  country: z.string().nonempty("País é obrigatório"),
  estado: z.string().nonempty("Estado é obrigatório"),
  cidade: z.string().nonempty("Cidade é obrigatório"),
  cep: z.string().nonempty("cep é obrigatório"),
  bairro: z.string().nonempty("Bairro é obrigatório"),
  rua: z.string().nonempty("Rua é obrigatório"),
  numero: z.string().nonempty("Numero é obrigatório"),
  complemento: z.string().nonempty("Complemento é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {



    // localStorage.setItem(`empresa`, JSON.stringify(data));

    console.log(typeof data);
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await HttpClient.Get("/search?street=Avenida+Paulista&city=Bela+Vista&format=json&limit=1");
  //       const result = await response.json();

  //       console.log(result[0]);

  //       localStorage.setItem(`empresa`, JSON.stringify(result[0]));

        
  //     } catch (error) {
  //         console.log(error);
          
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid size={12}>
        <Grid container spacing={2}>
          <Grid size={8}>

            <TextField
              fullWidth
              label="Razao Social"
              placeholder="Digite a razao social"
              {...register("razao_social")}
              error={!!errors.razao_social}
              helperText={errors.razao_social?.message}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              fullWidth
              label="Nome Fantasia"
              placeholder="Digite o Nome Fantasia"
              {...register("nome_fantasia")}
              error={!!errors.nome_fantasia}
              helperText={errors.nome_fantasia?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="CNPJ"
              placeholder="Digite seu cnpj"
              {...register("cnpj")}
              error={!!errors.cnpj}
              helperText={errors.cnpj?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="country"
              placeholder="Digite seu pais"
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="estado"
              placeholder="Digite seu estado"
              {...register("estado")}
              error={!!errors.estado}
              helperText={errors.estado?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="cidade"
              placeholder="Digite sua cidade"
              {...register("cidade")}
              error={!!errors.cidade}
              helperText={errors.cidade?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="cep"
              placeholder="Digite seu cep"
              {...register("cep")}
              error={!!errors.cep}
              helperText={errors.cep?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="bairro"
              placeholder="Digite seu bairro"
              {...register("bairro")}
              error={!!errors.bairro}
              helperText={errors.bairro?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="rua"
              placeholder="Digite seu rua"
              {...register("rua")}
              error={!!errors.rua}
              helperText={errors.rua?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="numero"
              placeholder="Digite seu numero"
              {...register("numero")}
              error={!!errors.numero}
              helperText={errors.numero?.message}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="complemento"
              placeholder="Digite seu complemento"
              {...register("complemento")}
              error={!!errors.complemento}
              helperText={errors.complemento?.message}
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
  );
}
