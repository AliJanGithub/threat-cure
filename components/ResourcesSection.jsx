import { FileText, Download } from 'lucide-react';

export default function ResourcesSection() {
  const whitepapers = [
    {
      title: 'State of Cybersecurity 2025',
      description: 'Comprehensive analysis of current threat landscape and emerging attack vectors. 42 pages.',
      pages: 42,
    },
    {
      title: 'Cloud Security Best Practices',
      description: 'Essential strategies for securing multi-cloud environments and preventing data breaches. 28 pages.',
      pages: 28,
    },
    {
      title: 'AI in Cybersecurity',
      description: 'How machine learning and AI are revolutionizing threat detection and response. 35 pages.',
      pages: 35,
    },
  ];

  return (
    <section id="resources" className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Download Whitepapers</h2>
          <p className="text-lg text-gray-600">
            In-depth research and analysis from our security experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whitepapers.map((paper, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="w-16 h-20 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-6 shadow-md">
                  <FileText className="w-8 h-8 text-[#ff6b35]" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{paper.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{paper.description}</p>

                <button className="w-full bg-[#ff6b35] text-white py-3 rounded-xl hover:bg-[#ff5722] transition-colors shadow-md flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
