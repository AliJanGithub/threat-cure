"use client";

import ServiceDetailPage from "../../../components/ServiceDetailPage";
import { Lock } from "lucide-react";

const cdpData = {
  title: "ThreatCure Cyber Drill Practices",
  subtitle: "CDP - Security Training & Simulation",
  description: "In an era where cyber threats are evolving rapidly, it's crucial for organizations to be well-prepared. At ThreatCure, we understand the importance of robust cybersecurity measures. Cyber Drill Practices help organizations test their defenses and train their teams through realistic simulations.",
  features: [
    "Automated Compliance Scanning",
    "Audit Trail Management",
    "Policy Enforcement",
    "Risk Assessment",
    "Documentation Automation",
    "Realistic Attack Simulations",
    "Team Training Programs",
    "Performance Analytics"
  ],
  benefits: [
    "100% Compliance Assurance",
    "Improved Team Readiness",
    "Identified Vulnerabilities",
    "Enhanced Response Time"
  ],
  stats: [
    { value: "100%", label: "Compliance" },
    { value: "Real", label: "Attack Simulations" },
    { value: "Expert", label: "Training" },
    { value: "Detailed", label: "Reports" }
  ],
  content: `Why Cyber Drill Practices Matter:
Cyber drills are essential for testing an organization's incident response capabilities. They help identify gaps in security protocols and ensure teams are prepared for real-world attacks.

Key Components:

Tabletop Exercises:
Discussion-based sessions where team members walk through simulated scenarios to test their response procedures.

Technical Simulations:
Hands-on exercises that test technical controls and incident response capabilities in a controlled environment.

Red Team Exercises:
Simulated attacks conducted by security experts to test the organization's defenses from an attacker's perspective.

Blue Team Exercises:
Defensive exercises where security teams practice detecting and responding to simulated threats.

Benefits of Regular Cyber Drills:
- Identify weaknesses in security protocols
- Improve team coordination during incidents
- Test and validate incident response plans
- Meet compliance requirements
- Build muscle memory for security responses
- Reduce response time during actual incidents

ThreatCure CDP Methodology:
Our experienced professionals design and execute customized cyber drill programs tailored to your organization's specific needs and threat landscape.

Post-Drill Analysis:
After each drill, ThreatCure provides comprehensive reports detailing performance metrics, identified gaps, and actionable recommendations for improvement.`
};

export default function CDPPage() {
  return (
    <ServiceDetailPage
      title={cdpData.title}
      subtitle={cdpData.subtitle}
      description={cdpData.description}
      content={cdpData.content}
      features={cdpData.features}
      benefits={cdpData.benefits}
      stats={cdpData.stats}
      icon={Lock}
    />
  );
}
