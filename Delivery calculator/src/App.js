import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EuroIcon from '@mui/icons-material/Euro';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import { useState, useEffect } from 'react';




function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgb(0 0 0 / 10%)',
      }}
    />
  );
}


export default function LayoutTextFields() {

  function isInRange(value, range) {
    return value > range[0] && value <= range[1];
  }

  function isNeg(e) {
    if (e < 0) {

      return true;
    }
    else {
      return false;
    }
  }

  function handleInput(e) {
    if (e.target.id == "cart") {

      if (isNeg(e.target.value)) {
        setCart(0)
      }
      else {
        setCart(e.target.value)
      }
    }
    else if (e.target.id == "distance") {
      if (isNeg(e.target.value)) {
        setDisance(0)
      }
      else {
        setDisance(e.target.value)
      }
    }
    else if (e.target.id == "count") {
      if (isNeg(e.target.value)) {
        setItemCount(0)
      }
      else {
        setItemCount(e.target.value)
      }
    }
  }

  var calculate = () => {
    var range = ['14:59', '18:59']
    let calculated = 0;

    if (cart >= 100 || cart == 0) {
      setPrice(0)
      return;
    }
    if (cart < 10) {

      calculated = parseFloat(cart) + (10 - cart)
    }
    console.log(calculated)

    if (distance > 1000) {
      calculated += 1 * Math.ceil((distance - 1000) / 500) + 2;
    }
    else {
      calculated += 2;
    }

    if (item_count >= 5) {
      calculated += ((item_count - 5) * 50 + 50) / 100
    }


    var Time = new Date(time)

    if (Time.getDay() == 5 && (isInRange(Time.getHours() + ':' + Time.getMinutes(), range))) {
      calculated *= 1.1;

    }
    console.log(calculated)
    if (calculated > 15) {
      calculated = 15;
    }
    setPrice(calculated)


  }
  const [cart, setCart] = useState(0)

  const [price, setPrice] = useState(0)
  const [item_count, setItemCount] = useState(0)
  const [distance, setDisance] = useState(0)
  const [time, setTime] = useState(new Date())

  var handle_time = (event) => {
    setTime(event.target.value)
  }
  return (
    <Grid container spacing={0} direction="row" alignitems="center" justifyContent="center" style={{ minHeight: '100vh', marginTop: '100px' }}>
      <Grid item xs={5}>
        <Paper elevation={5} style={{ maxWidth: 300 }}>
          <Grid container spacing={0} direction="row" alignitems="center" justifyContent="center" >
            <Grid item style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h4 style={{ margin: '30px' }}>Delivery Fee Calculator</h4>
                <div>

                  <FilledInput style={{ margin: '20px' }} label={'cart value'} id="cart" defaultValue={0} value={cart} type="number" onChange={handleInput} endAdornment={<InputAdornment position="end"><EuroIcon /></InputAdornment>} />
                  <div>
                    <FilledInput style={{ margin: '20px' }} label={'Delivery Distance'} id="distance" value={distance} defaultValue={0} type="number" onChange={handleInput} endAdornment={<InputAdornment position="end">m</InputAdornment>} />
                  </div>
                  <FilledInput value={item_count} style={{ margin: '20px' }} label={'Amount of items'} id="count" defaultValue={0} type="number" onChange={handleInput} endAdornment={<InputAdornment position="end"><ShoppingCartOutlinedIcon /></InputAdornment>} />


                  <TextField style={{ margin: '20px' }}
                    id="datetime-local"
                    label="Time"
                    type="datetime-local"
                    onChange={(event) => { setTime(event.target.value) }}

                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <Button style={{ margin: '20px' }} onClick={calculate} variant="contained" size="small">Calculate delivery price</Button>
                  <p style={{ marginLeft: '30px' }}>Delivery Price: {price}</p>
                </div>

              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}