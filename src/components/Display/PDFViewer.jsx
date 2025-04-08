import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1); // Reset to the first page when a new document is loaded
  };

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, numPages));

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("Error loading PDF:", error)}
      >
        <Page pageNumber={currentPage} />
      </Document>
      {numPages && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button onClick={goToPrevPage} disabled={currentPage <= 1}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {numPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage >= numPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
