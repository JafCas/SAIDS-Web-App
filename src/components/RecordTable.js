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
          // "http://localhost:4000/api/participantes/" + row._id,
          `${process.env.URI_ACCESS}/api/participantes/` + row._id,
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
    const res = await axios.get(`${process.env.URI_ACCESS}/api/participantes`);
    // const res = await axios.get("http://localhost:4000/api/participantes");
    this.setState({ participantes: res.data });
    console.log(res.data);
  }

  async componentDidMount() {
    this.getRecords();
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
      name: "Fecha de Aplicación", //Texto de la columna
      // selector: row => format(row.updatedAt), //Identificador de la columna
      selector: (row) => row.fechaParticipacionOnly, //Identificador de la columna
      sortable: false, //Ordenable?,
      //alignment: "center",
    },
    {
      name: "Puntuación C. de Ansiedad: ", //Texto de la columna
      selector: (row) => row.puntuacionTotalBAI, //Identificador de la columna
      sortable: false, //Ordenable?
      //grow: '2',
    },
    {
      name: "Puntuación C. de Depresión: ", //Texto de la columna
      selector: (row) => row.puntuacionTotalPHQ, //Identificador de la columna
      sortable: false, //Ordenable?
      //grow: '2',
    },
    {
      name: "Reporte de Análisis", //Texto de la columna
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
