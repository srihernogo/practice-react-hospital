import {
  Box,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Calender from '../../Shared/Calender/Calender';
import { Email } from '@mui/icons-material';
import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['MBBS', 'BCS', 'FCPS', 'PHD', 'BMBS', 'MBChC', 'MBBCh'];
const packages = ['24 HOURS', 'MORE THAN 2 DAYS', '10 DAYS OR MORE'];

function getStyles(name, packageName, theme) {
  return {
    fontWeight:
      packageName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AddPatient = () => {
  const theme = useTheme();
  const [packageName, setpackageName] = React.useState([]);
  const [value, setValue] = React.useState(new Date().toDateString()); // take only date not time

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['application/pdf', 'text/plain'];

  const changeHandler = (event) => {
    let selected = event.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setpackageName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  // reset form if confirmed
  const form = useRef(null);
  const handleReset = () => {
    let text = 'Are you sure you want to reset?';
    if (window.confirm(text) == true) {
      form.current.reset();
    } else {
      console.log('cancelled');
    }
  };
  // get email from url
  const url = window.location.href;
  const email = url.substring(url.lastIndexOf('/') + 1);
  // form data submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const age = formData.get('age');
    const weight = formData.get('weight');
    const SelectedPackage = packageName;
    const address = formData.get('address');
    const medicalHistory = formData.get('medicalHistory');

    console.log(
      name,
      phone,
      age,
      weight,
      SelectedPackage,
      address,
      medicalHistory,
      email,
      value
    );
  };

  return (
    <Box
      style={{
        border: '2px solid #ccc',
        padding: '1rem 1rem',
        background: '#fff',
      }}
    >
      <Box style={{ display: 'flex' }}>
        <Button variant="contained" sx={{ fontWeight: 700 }}>
          <NavLink
            to="/doctors"
            style={{ textDecoration: 'none', width: '100%', color: '#fff' }}
          >
            Doctors List
          </NavLink>
        </Button>
        {/* Package button */}
        <Button
          variant="contained"
          sx={{ ml: 2, fontWeight: 700 }}
          color="warning"
        >
          <NavLink
            to="/packages"
            style={{ textDecoration: 'none', width: '100%', color: '#fff' }}
          >
            Our Packages
          </NavLink>
        </Button>
        {/* selected doctor info button */}
        <Button
          variant="contained"
          sx={{ ml: 2, fontWeight: 700 }}
          color="success"
        >
          <NavLink
            to={`/appointment/${email}`}
            style={{ textDecoration: 'none', width: '100%', color: '#fff' }}
          >
            Selected Doctor Info
          </NavLink>
        </Button>
      </Box>
      <hr></hr>
      <form ref={form} onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '.5rem 2rem',
            textAlign: 'start',
          }}
        >
          {/* Add Name */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">PATIENT NAME</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <TextField
              id="standard-basic"
              label="Enter name of patient"
              required
              fullWidth
              name="name"
            />
          </Grid>
          {/* Phone */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">PHONE</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <TextField
              id="standard-basic"
              label="Enter phone number"
              required
              fullWidth
              name="phone"
            />
          </Grid>
          {/* Age */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">AGE</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <TextField
              id="standard-basic"
              label="Enter Age"
              required
              fullWidth
              name="age"
            />
          </Grid>
          {/* weight */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">WEIGHT</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <TextField
              id="standard-basic"
              label="Enter Weight"
              // required
              fullWidth
              name="weight"
            />
          </Grid>

          {/* Appointment date */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">SELECT DATE</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              marginLeft: { md: '-6.5rem' },
              display: 'flex',
              width: '100%',
            }}
          >
            <Calender value={value} setValue={setValue} />
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="OVERLINE TEXT">PACKAGE</Typography>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={packageName}
                onChange={handleChange}
                variant="standard"
                fullWidth
                name="package"
                sx={{ ml: 1 }}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {packages.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, packageName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box> */}
          </Grid>
          {/* Address */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">ADDRESS</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Enter your address"
              multiline
              rows={3}
              fullWidth
              name="address"
            />
          </Grid>
          {/* Medical History */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">MEDICAL HISTORY</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <TextField
              variant="outlined"
              id="standard-basic"
              label="Describe Medical History & Symptopms"
              multiline
              rows={3}
              fullWidth
              name="medicalHistory"
            />
          </Grid>
          {/* Medical History */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">TEST REPORT</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <input type="file" onChange={changeHandler} accept=".pdf, .txt" />
            <div className="output">
              {error && <div className="error">{error}</div>}
            </div>
          </Grid>
          {/* gender */}
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">GENDER</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="radio-buttons-group"
              required
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* PREPSCRIPTION, TEST REPORT,  */}
            <Typography variant="OVERLINE TEXT">ADD PREPSCRIPTION</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <Fab color="primary" aria-label="PREPSCRIPTION">
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="OVERLINE TEXT">DECISION</Typography>
          </Grid>
          <Grid item xs={12} md={8} sx={{ marginLeft: { md: '-5rem' } }}>
            <Box sx={{ display: 'flex', margin: '1rem 0' }}>
              <Button variant="contained" color="error" onClick={handleReset}>
                RESET
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{ ml: 2 }}
                type="submit"
              >
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddPatient;
