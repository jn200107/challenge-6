import { Grid,Box } from "@mui/material";


const Header=()=>{
    return(
        <Box sx={{paddingBottom:2}}>
            <Grid container sx={{backgroundColor:'#EBEFEB',borderRadius:1,width:'auto',pr:20,pl:20}} >
                <Grid item sx={{margin:'auto'}}><h1>autos disponibles</h1></Grid>
            </Grid>
            
        </Box>
    )
}

export default Header

