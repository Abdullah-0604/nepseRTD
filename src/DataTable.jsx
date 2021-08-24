import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function DataTable() {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    var myHeaders = new Headers();
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`https://cors-rest-api.herokuapp.com/todays-price`, requestOptions)
      .then((response) => response.json())
      .then((result) => setRowData(result))
      .catch((error) => console.log("error", error));
  }, []);
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const dynamicCellStyle = (params) => {
    if (params.value === "Police") {
      //mark police cells as red
      return { color: "red", backgroundColor: "green" };
    }
    return null;
  };

  const defaultColDef={
      flex:1,
  }

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <button
          onClick={() => onExportClick()}
          style={{ backgroundColor: "green" }}
        >
          export CSV
        </button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "80vh", width: "100%" }}
      >
        <AgGridReact rowData={rowData}
        onGridReady={onGridReady}
        suppressDragLeaveHidesColumns={true}
        enableBrowserTooltip={true}
        pagination={true}
        paginationPageSize={50}
        sideBar={true}
        defaultColDef={defaultColDef}
        >
          <AgGridColumn
            field="companyName"
            sortable
            filter={true}
            floatingFilter={true}
            resizable={true}
          ></AgGridColumn>
          <AgGridColumn
            field="noOfTransactions"
            headerName="No. Transactions"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
          <AgGridColumn
            field="maxPrice"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
          <AgGridColumn
            field="minPrice"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
          <AgGridColumn
            field="closingPrice"
            sortable
            tooltipField="companyName"
            cellStyle={dynamicCellStyle}
          ></AgGridColumn>
          <AgGridColumn
            field="tradedShares"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
          <AgGridColumn
            field="amount"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
          <AgGridColumn
            field="previousClosing"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
          <AgGridColumn
            field="difference"
            sortable
            tooltipField="companyName"
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
}

export default DataTable;
