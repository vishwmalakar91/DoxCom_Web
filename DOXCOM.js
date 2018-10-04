
// Config
var WaitTime = 500;   // How long to show the processing for each action

// Customer info
var CustomerIndex
var CustomerID;
var FirstName;
var LastName;
var CustomerType
var Balance;
var Status;
        

$(document).ready(function () {
    Reset();
    $("#ProcessingImage").hide();
    console.log("ready!");            
});

function ShowActionsDiv() {   
    $("#ProcessingImage").show();
    setTimeout(function () {
        $("#ProcessingImage").hide();
        $("#ActionDiv").show();
        }, 2000);    
}

function HideActionsDiv() {    
    $("#ActionDiv").hide();
}


function ShowRechargeDiv() {    
    $("#RechargeDiv").show();      
}

function Reset() {
    $("#RechargeDiv").hide();
    $("#CustomersTableDiv").hide();
    HideActionsDiv();    
    HideMessage();
}

var bDone = false;
var table;
function CustomersList() {
    Reset();
    $("#CustomersTableDiv").show();

    if (!bDone) {
        bDone = true;
        table = $("#CustomersTable").DataTable({
            data: data,
            columns: [
                { title: "ID" },
                { title: "First" },
                { title: "Last" },
                { title: "Type" },
                { title: "Balance" },
                { title: "Status" }
            ]
        });
    }
    else {        
        // Reload the data 
        table.clear().rows.add(data).draw();
    }
    
}


function SearchCustomer() {
    
    var customerID = GetNum();    
    Reset();
    
    $("#ActionDiv").hide();
    for (var i = 0; i < data.length; i++) {
        customer = data[i];
        if (customer[0] == customerID) {
            CustomerIndex = i;
            CustomerID = customerID;
            FirstName = customer[1];
            LastName = customer[2];
            CustomerType = customer[3];
            Balance = customer[4];
            Status = customer[5];


            $("#CustomerIDTextBox").val(customerID);
            $("#FirstNameTextBox").val(FirstName);
            $("#LastNameTextBox").val(LastName);
            $("#CustomerTypeTextBox").val(CustomerType);
            $("#BalanceTextBox").val(Balance);
            $("#StatusTextBox").val(Status);
            PaymentTypeChanged();            
            ShowActionsDiv();
            return;            
        }
    }

    ShowMessage("Customer not found");
}

function ShowMessage(txt) {        
    $("#ProcessingImage").show();
    setTimeout(function () {
        $("#ProcessingImage").hide();
        $("#Message").text(txt);
        $("#Message").show();
    }, 1000);    
}

function HideMessage() {
    $("#Message").hide();
}

function IncreaseBalance() {
    $("#ProcessingImage").show();
    Hide("RechargeDiv");
    var millisecondsToWait = 2500;
    setTimeout(function () {
        Hide("ProcessingImage");
        IncreaseBalance2();
    }, millisecondsToWait);
}

function IncreaseBalance2() {    
    var amount = +document.getElementById("Amount").value
    data[CustomerIndex][4] += amount;
    document.getElementById("BalanceTextBox").value = data[CustomerIndex][4];                    
    var txt = "Account was recharged with: $" + amount + ", new balance is: $" + data[CustomerIndex][4];
    ShowMessage(txt);    
}


function GetNum() {
    return +document.getElementById("CustID").value;
}

function calculate() {   
    //TODO: put some validation and if OK increase balance
    IncreaseBalance();    
}



function PaymentTypeChanged() {
    var pt = document.getElementById("PaymentType").value;
    Hide("CCDiv");
    Hide("CashdDiv");
    Hide("VoucherDiv");
    Hide("CheckDiv");    
    switch (pt) {
        case "Credit Card":
            Show("CCDiv");
            break;
        case "Cash":
            Show("CashdDiv");
            break;
        case "Voucher":            
            Show("VoucherDiv");
            break;
        case "Check":
            Show("CheckDiv");
            break;
    }
            
}


function Hide(id) {
    if (document.getElementById(id) == undefined) {
        alert("Cannot find item with id - " + id);
        return;
    }    
    $("#" + id).hide();
}

function Show(id) {
    $("#" + id).show();
}




