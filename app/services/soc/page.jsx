"use client";

import ServiceDetailPage from "../../../components/ServiceDetailPage";
import { Target } from "lucide-react";

const socData = {
  title: "ThreatCure Managed SOC Services",
  subtitle: "24/7 Security Operations Center",
  description: "In the ever-evolving digital landscape, threats are becoming more sophisticated and frequent. ThreatCure's Managed Security Operations Center (SOC) services are designed to offer businesses a robust defense mechanism. We monitor, detect, and respond to cyber threats, ensuring your organization remains fortified against digital adversaries.",
  features: [
    "24/7 Monitoring",
    "Advanced Threat Detection",
    "Incident Response",
    "Compliance Assurance",
    "Threat Intelligence",
    "Customized Solutions",
    "Real-time Alerting",
    "Expert Analysis"
  ],
  benefits: [
    "Proactive Defense",
    "Cost-Effective",
    "Access to Experts",
    "Peace of Mind"
  ],
  stats: [
    { value: "24/7", label: "Monitoring" },
    { value: "99.9%", label: "Threat Detection" },
    { value: "73%", label: "Attack Surface Reduction" },
    { value: "500+", label: "Enterprises Protected" }
  ],
  content: `Key Features:

24/7 Monitoring:
ThreatCure's cybersecurity experts provide round-the-clock monitoring of your IT infrastructure, ensuring real-time threat detection.

Advanced Threat Detection:
Using cutting-edge tools and technologies, ThreatCure identifies both traditional and emerging threats to keep your business secure.

Incident Response:
In case of a breach, ThreatCure promptly acts to contain the threat, reduce its impact, and maintain business continuity.

Compliance Assurance:
ThreatCure helps businesses maintain regulatory compliance with audits, comprehensive reports, and practical recommendations.

Threat Intelligence:
Our team stays updated with the latest cyber threat intelligence, ensuring proactive protection against new attack vectors.

Customized Solutions:
Recognizing the unique security needs of each organization, ThreatCure delivers tailored SOC solutions.

Benefits:

Proactive Defense:
We neutralize threats before they can cause damage.

Cost-Effective:
Building an in-house SOC is expensive. ThreatCure offers a cost-efficient alternative without compromising quality.

Access to Experts:
ThreatCure's seasoned cybersecurity professionals ensure your organization's safety.

Peace of Mind:
With ThreatCure managing your security, you can focus confidently on core business operations.

Why Choose ThreatCure:

Industry Recognition:
ThreatCure is a premier cybersecurity entity recognized for delivering top-tier security solutions.

Cutting-Edge Technology:
Powered by our ShieldOps Platform and continuous research efforts, clients receive unmatched event visibility.

Client Testimonials:
Our satisfied clients stand as proof of the effectiveness and reliability of ThreatCure's SOC services.`
};

export default function SOCPage() {
  return (
    <ServiceDetailPage
      title={socData.title}
      subtitle={socData.subtitle}
      description={socData.description}
      content={socData.content}
      features={socData.features}
      benefits={socData.benefits}
      stats={socData.stats}
      icon={Target}
    />
  );
}
