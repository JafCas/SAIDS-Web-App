import React, { Component, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
//import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
//import { format } from "timeago.js";

//import { useTable } from "react-table";

// const URLFile = row => <a href={row.ansiedadFileLink} />

const URLFile = (row) => (
  <Link href={row.ansiedadFileLink} color="#84c1e0">
    {/*<DownloadIcon>{row.ansiedadFileLink}</DownloadIcon>*/}
    <DownloadIcon />
  </Link>
);

const WhatsAppMeFile = (row) => (
  <Link onClick={() => window.open(`https://wa.me/${row.WaNumber}`, "_blank")}>
  <ToggleButton aria-label="bold" size="small">{row.WaNumber}</ToggleButton>
  </Link>
);

const StandaloneToggleButton = (row) => {
  const [selected, setSelected] = useState(!row.checadoPorEspecialista);
  return (
    <ToggleButton
      value="check"
      selected={!selected}
      size="small"
      onChange={async () => {
        setSelected(!selected);
        console.log("apretao", selected);
        const updateChecado = {
          checadoPorEspecialista: selected,
        };
        await axios.put(
          "http://localhost:4000/api/participantes/" + row._id,
          // "https://d10b-189-213-93-101.ngrok.io/api/participantes/" + row._id,
          // "https://saids-upiita.com/api/participantes/" + row._id,
          updateChecado
        );
      }}
    >
      {selected === false ? <CheckIcon /> : <ClearIcon />}
    </ToggleButton>
  );
};

class RecordTable extends Component {
  state = {
    participantes: [],
    _id: "",
  };

  async getRecords() {
    const res = await axios.get("http://localhost:4000/api/participantes/");
    // const res = await axios.get("https://d10b-189-213-93-101.ngrok.io/api/participantes");
    // const res = await axios.get("https://saids-upiita.com/api/participantes/");
    this.setState({ participantes: res.data });
  }

  async componentDidMount() {
    this.getRecords();
    console.log("uri: ", process.env.ACCESS_URI);
  }

  pagOptions = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  columnas = [
    {
      name: "Nombre del Participante", //Texto de la columna
      fontSize: '25px',
      selector: (row) =>
        `${row.apellidoParticipante} ${row.nombresParticipante}`, //Identificador de la columna
      sortable: false, //Ordenable?
    },
    {
      name: "Fecha de Aplicaci??n", //Texto de la columna
      // selector: row => format(row.updatedAt), //Identificador de la columna
      selector: (row) => row.fechaParticipacionOnly, //Identificador de la columna
      sortable: false, //Ordenable?,
      //alignment: "center",
    },
    {
      name: "Puntuaci??n C. de Ansiedad: ", //Texto de la columna
      selector: (row) => row.puntuacionTotalBAI, //Identificador de la columna
      sortable: false, //Ordenable?
      //grow: '2',
    },
    {
      name: "Puntuaci??n C. de Depresi??n: ", //Texto de la columna
      selector: (row) => row.puntuacionTotalPHQ, //Identificador de la columna
      sortable: false, //Ordenable?
      //grow: '2',
    },
    {
      name: "Reporte de An??lisis", //Texto de la columna
      // selector: row => row.ansiedadFileLink, //Identificador de la columna
      // cell: row => <a href = {row.ansiedadFileLink}/>,
      cell: (row) => <URLFile {...row} />,
      sortable: false, //Ordenable?
    },
    {
      name: "Contacto de WhatsApp", //Texto de la columna
       selector: row => row.WaNumber, //Identificador de la columna
      // cell: (row) => (
      //   <a href={`https://wa.me/${row.WaNumber}`}>{row.WaNumber}</a>
      // ),
      cell: (row) => <WhatsAppMeFile {...row} />,
      sortable: false, //Ordenable?
    },
    {
      name: "Contactado", //Texto de la columna
      // selector: row => row.checadoBinary, //Identificador de la columna
      cell: (row) => <StandaloneToggleButton {...row} />,
      sortable: false, //Ordenable?
    },
  ];

  render() {
    return (
      <div className="table-responsive">
        <DataTable
          columns={this.columnas}
          data={this.state.participantes}
          title="Reportes almacenados"
          defaultSortFieldId={2}
          defaultSortAsc={false}
          pagination
          paginationComponentOptions={this.pagOptions}
          fixedHeader //Hacer fijo el encabezado
          fixedHeaderScrollHeight="600px"
        />
      </div>
    );
  }
}

export default RecordTable;
