"use client";

import ServiceDetailPage from "../../../components/ServiceDetailPage";
import { Zap } from "lucide-react";

const csmsData = {
  title: "ThreatCure Cloud Security Management Services",
  subtitle: "CSMS - Comprehensive Cloud Protection",
  description: "Cloud security is a critical aspect of modern enterprises as they transition toward digital transformation and adopt cloud-based tools and services. Cloud Security Management Services (CSMS) encompass a set of procedures, technologies, and best practices designed to mitigate internal and external security threats.",
  features: [
    "AI-Powered Threat Detection",
    "Automated Incident Response",
    "Behavioral Analytics",
    "Threat Hunting Services",
    "Forensic Investigation",
    "Multi-Cloud Support",
    "Real-time Monitoring",
    "Compliance Management"
  ],
  benefits: [
    "Rapid Response Time",
    "Comprehensive Coverage",
    "Expert Team Access",
    "Scalable Solutions"
  ],
  stats: [
    { value: "15min", label: "Avg Response Time" },
    { value: "90%", label: "Cloud Investment" },
    { value: "40%", label: "Multi-Cloud Workloads" },
    { value: "24/7", label: "Protection" }
  ],
  content: `Cloud Adoption Challenges:
Cloud security practices are essential to manage internal and external threats. With businesses integrating cloud services into their operations, the need for structured cloud security becomes increasingly vital.

Terms like "digital transformation" and "cloud migration" reflect the growing need for modernization. However, as organizations work to enhance operational strategies, challenges arise—especially in maintaining security while maximizing productivity.

How ThreatCure CSMS Works:
Businesses are migrating from on-prem to cloud, multi-cloud, or hybrid environments. Therefore, cybersecurity architectures must remain flexible and adapt to rapid changes.

According to IBM Institute for Business Value (IBV), nearly 90% of cloud investment goes to public or hybrid clouds, while 40% of workloads operate across multiple clouds. This shift demands a modern security approach where trust boundaries evolve in real-time.

ThreatCure CSMS uses an advanced Cloud Security Posture Management (CSPM) methodology based on the NIST 5 Pillars framework:

Identify:
Identify types of threats and all assets at risk.

Protect:
Analyze how to safeguard the identified assets.

Detect:
Define methods for detecting threats impacting assets.

Respond:
Outline response strategies for detected threats.

Recover:
Define steps to restore impacted infrastructure and maintain overall security.`
};

export default function CSMSPage() {
  return (
    <ServiceDetailPage
      title={csmsData.title}
      subtitle={csmsData.subtitle}
      description={csmsData.description}
      content={csmsData.content}
      features={csmsData.features}
      benefits={csmsData.benefits}
      stats={csmsData.stats}
      icon={Zap}
    />
  );
}
