import { jsPDF } from "jspdf";

export const generatePDF = async (images: string[]): Promise<string> => {
    const doc = new jsPDF();

    for (let i = 0; i < images.length; i++) {
        const imgData = images[i];

        if (i > 0) {
            doc.addPage();
        }

        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    }

    // Create a blob URL
    const blob = doc.output("blob");
    return URL.createObjectURL(blob);
};
