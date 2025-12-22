"use client";

import ServiceDetailPage from "../../../components/ServiceDetailPage";
import { Cpu } from "lucide-react";

const tbrsData = {
  title: "ThreatCure Breach Response Service",
  subtitle: "TBRS - Rapid Incident Response",
  description: "In the digital age, the security of data is paramount. With the increasing sophistication of cyber threats, businesses need robust mechanisms to respond to breaches effectively. ThreatCure offers the Breach Response Service (TBRS) to ensure organizations are equipped to handle and recover from cyber breaches swiftly and efficiently.",
  features: [
    "Automated Vulnerability Scanning",
    "Risk-based Prioritization",
    "Remediation Workflow Automation",
    "Compliance Reporting",
    "Continuous Risk Assessment",
    "24/7 Response Team",
    "Forensic Analysis",
    "Post-Breach Recovery"
  ],
  benefits: [
    "95% Faster Remediation",
    "Immediate Response",
    "Expert Forensics",
    "Complete Recovery"
  ],
  stats: [
    { value: "95%", label: "Faster Remediation" },
    { value: "24/7", label: "On Standby" },
    { value: "100%", label: "Recovery Rate" },
    { value: "Expert", label: "Forensic Team" }
  ],
  content: `What is ThreatCure Breach Response (TBRS):
ThreatCure Breach Response (TBRS) refers to the set of actions and procedures that an organization undertakes in the aftermath of a cyber breach. This can range from a data breach, where sensitive information is accessed without authorization, to more aggressive threats like ransomware attacks.

Key Insights:

Ransomware Attack:
Malicious software that encrypts data, holding it hostage until a ransom is paid.

Data Exfiltration:
The unauthorized transfer of data from its original source to an external destination.

Data Breach:
Unauthorized access to sensitive data, potentially leading to data compromise.

How It Works:

Detection:
Identify the cyber breach, whether it's data encryption by ransomware or data exfiltration by malicious actors.

Containment:
Immediate measures are taken to contain the breach and prevent further compromise.

Assessment:
Analyze the extent of the breach, the impacted data, and exploited vulnerabilities.

Notification:
Inform stakeholders, affected customers, and regulatory entities per legal requirements.

Recovery:
Restore compromised systems, retrieve lost data, and strengthen security defenses.

Post Breach Service:
Ensure long-term preventive solutions are implemented while keeping business operations running smoothly.

ThreatCure Breach Response Quick Service:
ThreatCure offers rapid, efficient, and comprehensive breach response solutions designed for urgent cyber incidents.

Post Breach Commitment:
ThreatCure ensures your organization is prepared with tools, training, and strategies to prevent future breaches.`
};

export default function TBRSPage() {
  return (
    <ServiceDetailPage
      title={tbrsData.title}
      subtitle={tbrsData.subtitle}
      description={tbrsData.description}
      content={tbrsData.content}
      features={tbrsData.features}
      benefits={tbrsData.benefits}
      stats={tbrsData.stats}
      icon={Cpu}
    />
  );
}
