// all objects storing all expenses properties are stored here
var profit = [];

var o = "";
var row;
// Creates variable for cells of all tables
var categoryCell;
var amountCell;
var sellerCell;
var sellerpriceCell;    
var profitCell;
var dateCell;  

var i = 0;

var deleteButton = document.createElement("button");
// Stops execution of a function if stopExecution = true;
var stopExecution = false;

// This function pushes all properties of expenses entered by the user into the expenses array after making sure
// that the input are valid
function pushInput_To_Expenses() {
    var product       = document.getElementById("product").value;
    var amount          = document.getElementById("amount").value;
    var seller         = document.getElementById("pick a seller").value;
    var sellerprice     = document.getElementById("sellerprice").value;
    var date            = document.getElementById("date").value;

    var dateSplit       = date.split("-");
    var yearDate        = dateSplit[0];
    var monthDate       = dateSplit[1];
    var dayDate         = dateSplit[2];

    var dateUnit        = yearDate + monthDate + dayDate;

    var netAmount       = parseFloat(amount).toFixed(2);
    
    if (product.length == 0)
    {
        alert("Select a Category");
        stopExecution = true;
        return;
    }

    else if (amount < 0 || isNaN(amount) == true || amount.length == 0)
    {
        alert("invalid amount");
        stopExecution = true;
        return;
    }

    else if (sellerprice < 0 || isNaN(sellerprice) == true || sellerprice.length == 0)
    {
        alert("invalid amount");
        stopExecution = true;
        return;
        
    }
    
    else if (date.length == 0)
    {
        alert("Enter a Date");
        stopExecution = true;
        return;
    }

    profit.push({
        product1:      product,
        amount1:        netAmount,
        seller1:         seller,
        sellerprice1:  sellerprice,
        date1:          date,
        dateUnit1:      dateUnit    

    });

    create_Row_Insert_Values();
    push_Array_Into_Cells();
}

// Function to create new cells and rows at the end of the table
function create_Row_Insert_Values() {

    if (stopExecution == true)
    {
        return;
    }
        var table = document.getElementById("table1");
        
        row = table.insertRow(-1);
        

        productCell =  row.insertCell(0);
        amountCell =    row.insertCell(1);
        sellerCell =     row.insertCell(2);
        sellerpriceCell =      row.insertCell(3);
        profitCell =    row.insertCell(4); 
        dateCell =      row.insertCell(5);
        deleteCell =    row.insertCell(6);  
}

// function to insert values and images into each cells for each property of the expenses object, except for dateunit
function push_Array_Into_Cells()
{
    if (stopExecution == true)
    {
        return;
    }

    for(i = 0; i < profit.length ; i++)
        {
        productCell.innerHTML =    profit[i].product1;
        amountCell.innerHTML =      "₱" + profit[i].amount1;
        sellerCell.innerHTML =       profit[i].seller1;
        sellerpriceCell.innerHTML =       "₱" + profit[i].sellerprice1;
        profitCell.innerHTML =      "₱" + (profit[i].amount1 - profit[i].sellerprice1) ;
        dateCell.innerHTML =        profit[i].date1;
        deleteCell.innerHTML =      "<button onclick=" + 'remove_update(this);' + '>Remove</button>';
        }

        document.getElementById("product").value =       "";
        document.getElementById("amount").value =       "";
        document.getElementById("seller price").value =        "";  
}   

function calculateExpense() 
{
    var totalProfits   = 0;
    var times100        = 0;
    
    //calculate total expense
    for (var p = 0; p < profit.length; p++)
    {
        times100                 += parseInt((profit[p].amount1 - profit[p].sellerprice1) * 100);
        totalProfits           = times100 / 100;
    }
    document.getElementById("totalprofits").innerHTML  = "₱" + totalProfits;
}

// This function removes the object from the table and the array when the user clicks on the "remove" button
function remove_update(r)
{
    var i = r.parentNode.parentNode.rowIndex;
      
    document.getElementById("table1").deleteRow(i);
    expenses.splice(i - 1,1);        
}

function showExpense()
{
    // var sumExpenses is the sum of all expenses in the time period
    var sumExpenses         = 0;
    //Reset table
    var table2              = document.getElementById("table2");
    table2.innerHTML        = "";

    //Calculate the date unit of the start period 
    var startDate               = document.getElementById("startdate").value; //2019-10-23
    var startDateSplit          = startDate.split("-");

    var startYear               = startDateSplit[0];
    var startMonth              = startDateSplit[1];
    var startDay                = startDateSplit[2];

    var startDateUnit           = startYear + startMonth + startDay;

    //Calculate the date unit of the end period
    var endDate                 = document.getElementById("enddate").value;
    var endDateSplit            = endDate.split("-");

    var endYear                 = endDateSplit[0];
    var endMonth                = endDateSplit[1];
    var endDay                  = endDateSplit[2];

    var endDateUnit             = endYear + endMonth + endDay;
    
    //inserting the required values into the rows created in table 2
    for (i = 0; i < profit.length; i++) 
    {

        if (profit[i].dateUnit1 >= startDateUnit && profit[i].dateUnit1 <= endDateUnit)
        {       
        sumExpenses += parseInt(profit[i].amount1 - profit[i].sellerprice1);

        row = table2.insertRow(-1); 

        productCell =  row.insertCell(0);
        amountCell =    row.insertCell(1);
        sellerpriceCell =     row.insertCell(2);
        dateCell =      row.insertCell(3);

        productCell.innerHTML =    profit[i].product1;
        amountCell.innerHTML =      "₱" + profit[i].amount1;
        sellerpriceCell.innerHTML =  "₱" +  profit[i].sellerprice1;
        dateCell.innerHTML =        profit[i].date1;
        }

    }
    // At the last row, create a row that displays the sum of all expenses in the specified period
    row = table2.insertRow(-1);

    expenseSumCellLabel =       row.insertCell(0);
    expenseSumCell =            row.insertCell(1);

    expenseSumCellLabel.innerHTML    = "Total Profits:";
    expenseSumCell.innerHTML         = "₱" + sumExpenses;
}

