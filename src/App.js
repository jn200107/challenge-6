import { Box} from '@mui/material';
import {Grid} from '@mui/material'
import './App.css';
import Tabla from './cosas/tabla';


function App() {
    return (
      <Box sx={{padding:2,backgroundColor:'#D7DCD7',height:530,}}>
        <Grid className="App">
          <Tabla></Tabla>
        </Grid>
      </Box>
    );
}




export default App;
