import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Grid2 as Grid } from '@mui/material';
import Header from './view/pages/Header';
import ContentForm from './view/pages/ContentForm';
import ContentMap from './view/pages/ContentMap';

export default function App() {
  return (
    <>
      <Header/>
      <Grid container spacing={2} justifyContent="center" style={{ padding: '40px' }}>
        <Grid size={6}>
           <ContentForm/>
        </Grid>
        <Grid size={6}>
          <ContentMap/>
        </Grid>
      </Grid>
    </>
  )
}
