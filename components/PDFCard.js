"use client";

import { FileText, Download, Calendar } from 'lucide-react';

export default function PDFCard({ pdf }) {
  const handleOpenPDF = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Opening PDF:', pdf.path);
    
    // Direct approach - just open the PDF
    const pdfWindow = window.open(pdf.path, '_blank');
    
    // Fallback if window.open is blocked
    if (!pdfWindow || pdfWindow.closed || typeof pdfWindow.closed === 'undefined') {
      // Try iframe approach
      const iframe = document.createElement('iframe');
      iframe.src = pdf.path;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Also offer download as fallback
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 100);
    }
  };

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Simple download approach
    const link = document.createElement('a');
    link.href = pdf.path;
    link.download = pdf.fileName;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* PDF Card Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        {/* PDF Icon */}
        <div className="h-full flex flex-col items-center justify-center p-6">
          <div className="relative">
            <div className="w-20 h-24 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              PDF
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 font-medium">PDF Document</div>
            <div className="text-xs text-gray-500 mt-1">{pdf.size}</div>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {pdf.category}
          </span>
        </div>
      </div>

      {/* PDF Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {pdf.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pdf.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {pdf.date ? new Date(pdf.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : 'Recent'}
            </span>
          </div>
          <div className="text-xs bg-gray-100 px-2 py-1 rounded font-medium">
            {pdf.size}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
            onClick={handleOpenPDF}
          >
            <span>Open PDF</span>
          </button>
          
          <button
            className="px-4 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-300 flex items-center justify-center"
            onClick={handleDownloadPDF}
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Debug overlay (remove in production) */}
      <div 
        className="absolute inset-0 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
        onClick={handleOpenPDF}
        title={`Click to open: ${pdf.fileName}`}
      />
    </div>
  );
}