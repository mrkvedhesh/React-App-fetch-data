// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() { 
  const [responseData, setResponseData] = useState([]);
  const [search, setsearch] = useState('')

  const getData = async () => {
    try {
      const data = await axios.get("https://swapi.dev/api/people/?page=1");
      setResponseData(data.data.results);
      console.log(data.data.results);
    } catch (error) { 
      console.log(error)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1>Test Table</h1>
      <input
        type="text"
        placeholder="search here"
        onChange={(e) => {
          setsearch(e.target.value)
        }} />


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Height</StyledTableCell>
              <StyledTableCell align="right">Mass</StyledTableCell>
              <StyledTableCell align="right">Hair Color</StyledTableCell>
              <StyledTableCell align="right">Skin Color</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.filter((item) => {
              console.log(item)
              console.log(search)
              if (search == "") {
                return item             
                
              } else {
                let itemStr = ((Object.values(item)).toString()).toLowerCase();
                console.log("🚀 ~ file: App.js ~ line 38 ~ App ~ itemStr", itemStr)
                if (itemStr.includes(search.toLowerCase())) {
                  return item
                }
              } 
            }).map((x) => {
              return (
                <StyledTableRow key={x.id} >
                  <StyledTableCell component="th" scope="row">
                    {x.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {x.height}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {x.mass}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {x.hair_color}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {x.skin_color}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {x.gender}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
