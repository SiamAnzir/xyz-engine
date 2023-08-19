import jsPDF from "jspdf";
import "jspdf-autotable";

const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
            "Page " + String(i) + " of " + String(pageCount),
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            {
                align: "center",
            }
        );
    }
};

const generatePDF = (data) => {
    const date = new Date();
    const doc = new jsPDF({
        orientation: "landscape",
    });
    const tableRows = [];

    data.forEach((each) => {
        const rowData = [
            each.projectName,
            each.projectDescription,
            each.client ,
            each.contractor,
            each.maxX,
            each.minX,
            each.maxY,
            each.minY,
            each.maxZ,
            each.minZ,
        ];
        tableRows.push(rowData);
    });
    let width = doc.internal.pageSize.getWidth();
    // Pdf title. and margin-top + margin-left
    doc.text("XYZ Engine Project List", width / 2, 15, { align: "center" });

    // startY is basically margin-top
    doc.autoTable({
        startY: 20,
        columns: ["Project Name", "Description", "Client","Contractor", "Max X","Min X","Max Y","Min Y","Max Z","Min Z"],
        body: tableRows,
        theme: "plain",
        styles: { halign: "center", lineColor: "DCE0E4", lineWidth: 0.2 },
        headStyles: {
            textColor: "black",
            fillColor: "#fafbfe",
        },
    });
    addFooters(doc);
    doc.save("XYZ Engine Project List" + "_" + date.toLocaleTimeString());
};

export default generatePDF;