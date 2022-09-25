const btnPrint = document.getElementById("grades-modal-printIcon");
export function initPrintSubject() {
    btnPrint.addEventListener("click", () => {
        printWindow();
    })
}

function printWindow() {
    let elementToPrint = document.getElementById("print-subjects-modal");

    let ventimp = window.open(' ', 'popimpr');
    ventimp.document.write(`<link rel="stylesheet" href="CSS/bootstrap.css"><link rel="stylesheet" href="CSS/printSubjectModal.css"><script src="JS/bootstrap.js" defer></script>`)
    ventimp.document.write(elementToPrint.innerHTML);
    ventimp.document.close();
    setTimeout(() => {
        ventimp.print();
        ventimp.close();
    }, 100);
}