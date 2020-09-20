function learningMacros() {

  // setup de hoja activa para trabajar
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  //const sheet = ss.getActiveSheet()
  const sheetName = "Copy of Sheet1"
  const rangoDatos = "A2:C11"
  const sheet = ss.getSheetByName( sheetName )
 
  // fondo negro letra blanca
  // para las 3 primeras columnas desde el punto 1,1
  sheet.getRange(1, 1, 1, 3).setBackgroundRGB(0, 0, 0).setFontColor("white").setFontWeight("bold").setFontSize(12)
  
  // cargarDatosExternos( sheet )
  
  ordenar(sheet, rangoDatos)
  
  cebra(sheet, rangoDatos)
  
}

function cebra( sheet, rangoDatos ) {
  const range = sheet.getRange(rangoDatos) 
  // reset bg color
  range.setBackground("white")
  
  const rowIndex = range.getRowIndex()
  const lastRowIndex = range.getLastRow()
  const lastColumn = range.getLastColumn()
  
  for(i = rowIndex; i <= lastRowIndex; i+=2) {
    sheet.getRange(i, 1, 1, lastColumn).setBackgroundRGB(238, 239, 32)
  }
  
}

function ordenar( sheet,  rango ) {
  sheet.getRange( rango ).sort([
    {column: 2, ascending: true},
    {column: 1, ascending: false}
  ])
}

function cargarDatosExternos( sheet ) {
  const wsURL = "https://jsonplaceholder.typicode.com/users"
  const response = UrlFetchApp.fetch( wsURL )
  const data = JSON.parse( response.getContentText() )
  
  // seteo cabeceras
  sheet.getRange(1, 1).setValue("Nombre")
  sheet.getRange(1, 2).setValue("Username")
  sheet.getRange(1, 3).setValue("Email")
  // carga de datos
  data.forEach( (u, index) => {
    let i = index + 2
    sheet.getRange(i, 1).setValue( u.name )
    sheet.getRange(i, 2).setValue( u.username )
    sheet.getRange(i, 3).setValue( u.email )
    
    // cebra
    if( index % 2 == 0 ) {
      sheet.getRange(i,1,1,3).setBackgroundRGB(200, 200, 200)
    }          
  })
}
