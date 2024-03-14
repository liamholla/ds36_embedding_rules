// Create some constants and variables that we will
// use later to find out about the workbook structure

const viz = document.getElementById("ourViz");
let workbook;
let vizActiveSheet;
let listSheets;

// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Log all the information about the workbook
// with a function

function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  //Get the array of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}] is: "${element.name}`);
  });

  //   We are only interested in the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet name is: "${vizActiveSheet.name}"`);

  //   List all of the worksheets within the actice sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}] is: "${element.name}"`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// Log thw workbook information once the viz is interactive
viz.addEventListener("firstinteractive", logWorkbookInformation);

// Tell JS which button to look for
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// Functions to do when buttons are clicked

function oregonWashFunction() {
  // Log what is pressed
  console.log(oregonWashingtonButton.value);

  //   Apply the filter to all of the sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearStateFilter() {
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}

function unDo() {
  viz.undoAsync();
}

oregonWashingtonButton.addEventListener("click", oregonWashFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);
