import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const GenerateExcel = ({dataForExcel, fileName}) => {
  // const data = [
  //   { ID: 1, Name: "Alice", Age: 25, Email: "alice@example.com" },
  //   { ID: 2, Name: "Bob", Age: 30, Email: "bob@example.com" },
  //   { ID: 3, Name: "Charlie", Age: 28, Email: "charlie@example.com" },
  // ];

  const exportToExcel = () => {
    // Create a new workbook and worksheet
    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convert to binary
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Convert binary to Blob
    const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Save the file
    saveAs(fileData, `${fileName}.xlsx`);
  };

  return (
      <button
        onClick={exportToExcel}
        className="bg-blue-600 hover:bg-blue-700 text-white py-[7px] px-[12px] rounded"
      >
        Download Excel
      </button>
  );
};

export default GenerateExcel;
