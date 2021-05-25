function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu("HCS Menu")
    .addItem("Ordenar Autos por Precio", "ordenarAutosPorPrecioAsc")
    .addSeparator()
    .addItem("Ordenar Autos por Año", "ordenarAutosPorAnnoDesc")
    .addSeparator()
    .addItem("Ordenar Autos por Marca", "ordenarAutosPorMarca")
    .addToUi();
}

function ordenarAutosPorPrecioAsc() {
  const toRow = promptOrderToRow();
  const sortColumns = [ // 1.Marca, 2.Modelo, 3.Año, 4.Precio
    {column:4, ascending: true},
    {column:3, ascending: false},
    {column:1, ascending: true},
    {column:2, ascending: true}
  ];
  ordenarAutos(sortColumns, toRow);
}

function ordenarAutosPorAnnoDesc(){
  const toRow = promptOrderToRow();
  const sortColumns = [ // 1.Marca, 2.Modelo, 3.Año, 4.Precio
    {column:3, ascending: false},
    {column:4, ascending: true},
    {column:1, ascending: true},
    {column:2, ascending: true}
  ];
  ordenarAutos(sortColumns, toRow);
}

function ordenarAutosPorMarca(){
  const toRow = promptOrderToRow();
  const sortColumns = [ // 1.Marca, 2.Modelo, 3.Año, 4.Precio
    {column:1, ascending: true},
    {column:2, ascending: true},
    {column:3, ascending: true},
    {column:4, ascending: true}
  ];
  ordenarAutos(sortColumns, toRow);
}

function promptOrderToRow(){
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt("Ingrese hata qué fila desea ordenar", ui.ButtonSet.YES_NO);
  if(response.getSelectedButton() == ui.Button.YES) {
    return parseInt( response.getResponseText() )
  }
  return 1
}


function ordenarAutos(sortColumns, toRow) {  
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Autos");
    const rangeA1Notation = "A2:D"+toRow;
    sheet.getRange( rangeA1Notation ).sort(sortColumns);  
}

