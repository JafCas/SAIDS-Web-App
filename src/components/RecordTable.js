import React, { Component } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { format } from "timeago.js";

class RecordTable extends Component {
  state = {
    notes: [],
  };

  async getRecords() {
    const res = await axios.get("http://localhost:4000/api/Records");
    this.setState({ notes: res.data });
    console.log(res.data);
  }

  async componentDidMount() {
    this.getRecords();
  }

  pagOptions ={
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  }

  columnas = [
    {
      name: "Titulo", //Texto de la columna
      selector: row => row.title, //Identificador de la columna
      sortable: true, //Ordenable?
    },
    {
      name: "Nombre", //Texto de la columna
      selector: row => row.author, //Identificador de la columna
      sortable: true, //Ordenable?
      //grow: '2',
    },
    {
      name: "Fecha", //Texto de la columna
      selector: row => format(row.date), //Identificador de la columna
      sortable: true, //Ordenable?
    },
    {
      name: "Contenido", //Texto de la columna
      selector: row => row.content, //Identificador de la columna
      sortable: true, //Ordenable?
    },
  ];

  render() {
    return (
      <div className="table-responsive">
        <DataTable
          columns={this.columnas}
          data={this.state.notes}
          title="Reportes almacenados"
          defaultSortFieldId={3}
          pagination
          paginationComponentOptions={this.pagOptions}
          fixedHeader //Hacer fijo el encabezado
          fixedHeaderScrollHeight= "600px"
        />
      </div>
    );
  }
}

export default RecordTable;
