import { z } from 'zod';

const formSchema = z.object({
  company_name: z.string().nonempty("Razao social é obrigatório"),
  trade_name: z.string().nonempty("Nome fantasia é obrigatório"),
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
  state: z.string().nonempty("Estado é obrigatório"),
  city: z.string().nonempty("Cidade é obrigatório"),
  postalcode: z.string().nonempty("Cep é obrigatório"),
  nighborhood: z.string().nonempty("Bairro é obrigatório"),
  street: z.string().nonempty("Rua é obrigatório"),
  number: z.string().optional(),
  complement: z.string().nonempty("Complemento é obrigatório"),
});

export { formSchema, z}