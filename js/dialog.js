function DlgShow(Message) {
    // Change the message.
    var Msg = document.getElementById("DlgContent");
    Msg.innerHTML = Message;

    // Display the dialog box.
    var Dlg = document.getElementById("Overlay");
    Dlg.style.visibility = "visible";
}

function DlgHide(Result) {
    // Display the result onscreen.
    /*var Output = document.getElementById("Result");
    Output.innerHTML = "You clicked: " + Result;

    // Hide the dialog box.
    var Dlg = document.getElementById("Overlay");
    Dlg.style.visibility = "hidden";*/
}