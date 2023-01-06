import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {useEffect,useState} from 'react';
import axios from 'axios'
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Header from './header' ;




const Tabla=()=>{

    const [data,setData]=useState([])

    let obtenerDatos=async()=>{
        try{
            const{data:response}=await axios.get('http://localhost:3009/autos')
            setData(response)
        }catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        obtenerDatos()
    },[])


    const[Mostrar,setMostrar]=useState(true)
    const agregar=()=>{
        setMostrar(false)
        setNombre('')
        set_año_fabricacion('')
        setPrecio('')
        setCantidad('')
    }
    const menu=()=>{
        setMostrar(true)
        setMostrarGuardar(true)
    }


    const [nombre,setNombre]=useState('')
    const [año_fabricacion,set_año_fabricacion]=useState('')
    const [cantidad,setCantidad]=useState('')
    const [precio,setPrecio]=useState('')



        const enviar=()=>{
        if(nombre===''|| año_fabricacion===''||cantidad===''||precio===''){
            alert('porfavor llenar todos los campos')
        }else{
            if (!Mostrar){
            axios.post('http://localhost:3009/agregar',{
                nombre:nombre,
                año_fabricacion:año_fabricacion,
                cantidad:cantidad,
                precio:precio
            }).then(response=>{
                setMostrar(true)
                obtenerDatos()
            })
        }}
        
    }

    const onchange_Nombre=(event)=>{
        setNombre(event.target.value)
    }
    const onchange_año_fabricacion=(event)=>{
        set_año_fabricacion(event.target.value)
    }
    const onchange_precio=(event)=>{
        setPrecio(event.target.value)
    }
    const onchange_cantidad=(event)=>{
        setCantidad(event.target.value)
    }

    const editar=(objeto)=>{
        setMostrar(false)
        setNombre(objeto.nombre)
        set_año_fabricacion(objeto.año_fabricacion)
        setPrecio(objeto.precio)
        setCantidad(objeto.cantidad)
        setid(objeto.idvehiculo)
        setMostrarGuardar(false)
    }


    const [MostrarGuardar,setMostrarGuardar]=useState(true)

    const[id,setid]=useState()

    const actualizar=()=>{
        if (nombre===''|| año_fabricacion===''||cantidad===''||precio===''){
            alert('porfavor llenar todos los campos')
        }else{
            axios.put(`http://localhost:3009/actualizar-auto/${id}`,{
                nombre:nombre,
                año_fabricacion:año_fabricacion,
                cantidad:cantidad,
                precio:precio
            }).then(()=>{
                setNombre('')
                set_año_fabricacion('')
                setCantidad('')
                setid()
                setPrecio('')
                setMostrar(true)
                obtenerDatos()
                setMostrarGuardar(true)
            })
        }
    }

    return (
        <Box sx={{}}>
            {
                Mostrar&&
                <>
                    <Grid>
                        <Header></Header>
                        <TableContainer component={Paper} >
                            <Table  sx={{ minWidth: 'auto'}} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell> <strong>id</strong> </TableCell>
                                    <TableCell align="right"><strong>nombre</strong> </TableCell>
                                    <TableCell align="right"><strong>año fabricacion</strong></TableCell>
                                    <TableCell align="right"><strong>precio</strong></TableCell>
                                    <TableCell align="right"><strong>cantidad</strong></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody className='tabla' >
                                {data.map((row) => (
                                    <TableRow onClick={()=>{editar(row)}} key={row.idvehiculo}sx={{border: 0}}>
                                    <TableCell component="th" scope="row">{row.idvehiculo}</TableCell>
                                    <TableCell align="right">{row.nombre}</TableCell>
                                    <TableCell align="right">{row.año_fabricacion}</TableCell>
                                    <TableCell align="right">{row.precio}</TableCell>
                                    <TableCell align="right">{row.cantidad}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                                    
                            <Grid container sx={{backgroundColor:'white',justifyContent:'center',p:2}}>
                                <Button className='boton' onClick={()=>{agregar()}} size="small" variant="contained" color="success">agregar autos</Button> 
                            </Grid>
                            
                        </TableContainer>
                    </Grid>
                </>
            }
            {
                !Mostrar&&
                <>

                    <Grid container sx={{margin:'auto',width:400,paddingTop:1,justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                        <TextField  autoFocus onChange={onchange_Nombre} value={nombre} sx={{mb:1}} id="outlined-basic" label="nombre" variant="outlined" color='success'/>
                        <TextField  onChange={onchange_año_fabricacion} value={año_fabricacion} sx={{mb:1}} id="outlined-basic" label="año fabricacion" variant="outlined" color='success' />
                        <TextField  onChange={onchange_precio} value={precio} sx={{mb:1}} id="outlined-basic" label="precio" variant="outlined" color='success'/>
                        <TextField  onChange={onchange_cantidad} value={cantidad} sx={{mb:1}} id="outlined-basic" label="cantidad" variant="outlined" color='success'/>
                    </Grid>


                    <Grid container sx={{ p:2,margin:'auto',justifyContent:'center',alignItems:'center'}} >
                        
                            <>
                            {
                                    MostrarGuardar?
                                    <>
                                <Grid>
                                <Button onClick={()=>{enviar()}} variant="contained" color="success">añadir</Button>
                                <Button onClick={()=>{menu()}} sx={{ml:1}} variant="contained" color="error">cancelar</Button>
                                </Grid>
                                </>
                                :
                                <>
                                <Grid>
                                <Button onClick={()=>{actualizar()}} variant="contained" color="success">actualizar</Button>
                                <Button onClick={()=>{menu()}} sx={{ml:1}} variant="contained" color="error">cancelar</Button>
                                </Grid>
                                </>
                            }
                            </>
                        
                    </Grid>
                </>        
                
            }
        </Box>

    );




}



export default Tabla