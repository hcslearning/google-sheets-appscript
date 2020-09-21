function createCron() {
  ScriptApp.newTrigger( "myCronFunction" ).timeBased().everyMinutes(1).create()
}

function myCronFunction() {
  const spreadsheetIdPruebaMacros = "1VXgreobAqz2cm96epfr39H9xofakwe_LMnGaAyZ7CWo"
  const spreadsheet = SpreadsheetApp.openById( spreadsheetIdPruebaMacros )
  const sheetName = "cronsheet"
  const sheet = spreadsheet.getSheetByName( sheetName )
  let row = 1
  let column = 1
  let range = sheet.getRange(row, column)
  
  while( true ) {
    if( range.isBlank() ) {
      range.setValue( new Date() )
      break;
    }
    row++
    range = sheet.getRange(row, column)
  }
}

function correo() {
  /** ej html mail 
  MailApp.sendEmail({
    to: email,
    subject: "This is a test email",
    htmlBody: message
  });
  */
  //MailApp.sendEmail("lorem@123.cl", "prueba con appscript", "lorem ipsum dolor asit atme")
  toast( "Correo enviado" )
}

function toast(mensaje) {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  ss.toast( mensaje )
}

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
