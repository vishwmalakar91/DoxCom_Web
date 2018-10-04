
function AL_Message(msg) {

    alert(msg);
};


function fOnload(htmlelm) {

    // alert("fOnload");
    //First do layout of tables    
    $(htmlelm).find(".ALtable").each(function (index) {
        if ($(this).attr("data-ALinitDone") == undefined) {
            formatALTable(this);
            $(this).attr("data-ALinitDone", "True");
        }
    });


}



function formatALTable(table) {

        // alert("format table");
        $(table).dataTable({
            //"sDom": '<"top"f>rt<"bottom"lp><"clear">'
            "sDom": '<"top"f>rt<"bottom"ilp><"clear">',
            "sPaginationType": "full_numbers",
            "aLengthMenu": [[20, 50, 100, -1], [20, 50, 100, "All"]],
            "iDisplayLength": 20
        });    
}




