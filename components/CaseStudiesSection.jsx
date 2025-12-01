import { Building2, Heart, ShoppingCart } from 'lucide-react';

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      icon: Building2,
      title: 'Global Financial Corp',
      industry: 'Banking & Finance',
      description: 'Prevented 127 sophisticated attacks in 6 months, reducing security incidents by 94% and achieving full compliance with PCI-DSS and SOC 2 standards.',
      metrics: [
        { value: '94%', label: 'Incident Reduction' },
        { value: '127', label: 'Attacks Prevented' },
      ],
    },
    {
      icon: Heart,
      title: 'HealthTech Solutions',
      industry: 'Healthcare Technology',
      description: 'Secured patient data for 2M+ users, achieved HIPAA compliance, and detected ransomware attack before encryption began, saving $8M in potential damages.',
      metrics: [
        { value: '$8M', label: 'Damages Prevented' },
        { value: '2M+', label: 'Users Protected' },
      ],
    },
    {
      icon: ShoppingCart,
      title: 'RetailMax Enterprise',
      industry: 'E-commerce',
      description: 'Protected Black Friday sales processing $50M in transactions, blocked 3,400 fraud attempts, and maintained 99.99% uptime during peak traffic periods.',
      metrics: [
        { value: '99.99%', label: 'Uptime' },
        { value: '3.4K', label: 'Fraud Blocked', highlight: true },
      ],
    },
  ];

  return (
    <section id="case-studies" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
          <p className="text-lg text-gray-600">Real results from real clients</p>
        </div>

        <div className="space-y-6">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                  <study.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{study.title}</h3>
                  <p className="text-gray-600">{study.industry}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{study.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {study.metrics.map((metric, metricIndex) => (
                  <div
                    key={metricIndex}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <div className={`text-3xl font-bold mb-1 ${metric.highlight ? 'text-[#ff6b35]' : 'text-[#5d443a]'}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
