"use client";

import ServiceDetailPage from "../../../components/ServiceDetailPage";
import { Brain } from "lucide-react";

const socAssessmentData = {
  title: "ThreatCure SOC Maturity Assessment",
  subtitle: "Security Operations Center Evaluation",
  description: "It's a SOC's responsibility to function efficiently and help the organization defend against cyber threats before they have a disruptive effect on the business. This is where functional maturity measurement plays its part.",
  features: [
    "Predictive Threat Intelligence",
    "Machine Learning Algorithms",
    "Dark Web Monitoring",
    "Zero-day Threat Prediction",
    "Behavioral Analysis",
    "CMM Level Assessment",
    "ROI Demonstration",
    "Roadmap Development"
  ],
  benefits: [
    "99.9% Prediction Accuracy",
    "Clear Maturity Roadmap",
    "Benchmarking Insights",
    "Expert Evaluation"
  ],
  stats: [
    { value: "99.9%", label: "Accuracy" },
    { value: "6", label: "CMM Levels" },
    { value: "Expert", label: "Assessment" },
    { value: "Detailed", label: "Roadmap" }
  ],
  content: `SOC Importance in Modern-day Defense Arena:
Security Operations Centers (SOCs) are centers of expertise for numerous organizations, where information and skills related to cyber security are collected.

The SOC is where experienced professionals gather, process, and analyze log data collected throughout the company's digital assets to identify signs of cyber risks in the infrastructure. Thus, the SOC delivers value to the company by strengthening the organization's resistance to cyber threats and minimizing the harm caused by cyberattacks.

ThreatCure SOC Maturity Assessment Tool:
We will be able to determine the organization's SOC's strengths and limitations with the use of ThreatCure SOC maturity assessment management tool. It also enables for the assessment of SOC growth, demonstrating the return on investment in the SOC.

The SOC maturity assessment will assist the client in benchmarking its maturity against CMM levels, allowing management to establish a roadmap for SOCs moving ahead and evolving to give the maximum value to the firm.

ThreatCure SOC Assessment Methodology:
The establishment of the SOC maturity assessment model was an essential milestone in the research. Threatcure services along with an assessment tool will develop and validate the results in numerous iterations to get a more specific outcome.

Capability Maturity Model Levels:
- CMM 0 – Not Performed
- CMM 1 – Performed Informally
- CMM 2 – Planned & Tracked
- CMM 3 – Well-Defined
- CMM 4 – Quantitatively Controlled
- CMM 5 – Continuously Improving

These 6 levels are plotted against two axes: Cost & Complexity, and Maturity level (people, processes & technology).

ThreatCure Workshop:
ThreatCure experienced professionals will lead an evaluation session with several SOC specialists, ideally with diverse roles (engineers, analysts, etc.) and viewpoints. A varied array of persons attending the session is more likely to spark discourse.

ThreatCure Engagement Outcome:
When the assessment is finished, the SOC maturity assessment results section displays the final scores in a table and graph. A big radar chart displays the maturity score for each component of the SOC. Capacity is assessed on technology and services (0–3), while maturity is measured on a 0–5 scale.`
};

export default function SOCAssessmentPage() {
  return (
    <ServiceDetailPage
      title={socAssessmentData.title}
      subtitle={socAssessmentData.subtitle}
      description={socAssessmentData.description}
      content={socAssessmentData.content}
      features={socAssessmentData.features}
      benefits={socAssessmentData.benefits}
      stats={socAssessmentData.stats}
      icon={Brain}
    />
  );
}
