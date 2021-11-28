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
  const getData = async (i) => {

    try {
      const data = await axios.get("https://swapi.dev/api/people/?page=" + i.toString());
      setResponseData(data.data.results);
      console.log(data.data.results);
    } catch (error) {

      console.log(error)
    }
  };

  const [responseData, setResponseData] = useState([]);
  const [search, setsearch] = useState('')
  const [pageIndex, setPageIndex] = useState(1);
  const [nextBtnState, setnextBtnState] = useState(false);
  const [prevBtnState, setPrevBtnState] = useState(true);
  useEffect(() => {
    async function fetchData() {
      await getData(pageIndex);
    }
    fetchData();
  }, [pageIndex]);

  return (
    <div className="App">
      <h1>Vedhesh - Fetch data from JSON-API and table creation</h1>
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
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Birth Year</StyledTableCell>
              <StyledTableCell align="center">Height</StyledTableCell>
              <StyledTableCell align="center">Mass</StyledTableCell>
              <StyledTableCell align="center">Hair Color</StyledTableCell>
              <StyledTableCell align="center">Skin Color</StyledTableCell>
              <StyledTableCell align="center">Eye Color</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.filter((item) => {
              if (search === "") {
                return item

              } else {
                let itemStr = ((Object.values(item)).toString()).toLowerCase();
                if (itemStr.includes(search.toLowerCase())) {
                  return item
                }
              }
            }).map((x) => {
              return (
                <StyledTableRow key={x.id} >
                  <StyledTableCell align="center">{x.name}</StyledTableCell>
                  <StyledTableCell align="center">{x.gender}</StyledTableCell>
                  <StyledTableCell align="center">{x.birth_year}</StyledTableCell>
                  <StyledTableCell align="center">{x.height}</StyledTableCell>
                  <StyledTableCell align="center">{x.mass}</StyledTableCell>
                  <StyledTableCell align="center">{x.hair_color}</StyledTableCell>
                  <StyledTableCell align="center">{x.skin_color}</StyledTableCell>
                  <StyledTableCell align="center">{x.eye_color}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <button type="button" id="prevBtn" disabled={prevBtnState} onClick={() => {
        if (pageIndex>=1){
          setPageIndex(pageIndex - 1)
          if (pageIndex===2){
            setPrevBtnState(true)
          }else if (pageIndex === 9){
            setnextBtnState(false)
          }
        }
      }}>Previous</button>
      <button type="button" id="nextBtn" disabled={nextBtnState} onClick={() => {
        if (pageIndex <= 8) {
          setPageIndex(pageIndex + 1)
          if (pageIndex===8){
            setnextBtnState(true)
          }else if (pageIndex === 1){
            setPrevBtnState(false)
          }
        } 
      }}>Next</button>
      

    </div>
  );
}

export default App;
