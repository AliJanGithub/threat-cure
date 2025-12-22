import React from "react";
import { motion } from "framer-motion";
// Local Card Components (no external file needed)
function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow p-6 bg-white border ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}

// Component expects: title (string), content (string)
export default function ServicesLearnMore({ title,content }) {
  return (
    <div className="min-h-screen w-full bg-white text-black p-6 md:p-12">
      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-10 drop-shadow"
      >
        {title}
      </motion.h1>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Card className="bg-white border border-orange-200 shadow-xl rounded-2xl p-4 md:p-8">
          <CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg max-w-full text-gray-800 leading-relaxed whitespace-pre-line"
            >
              {content}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Example service data for ThreatCure SOC Maturity Assessment
export const socMaturityAssessment = {
  title: "ThreatCure® Security Operation Center (SOC) Maturity Assessment",
  content: `It’s a SOC a responsibility to function efficiently and help the organization defend against cyber threats before they have a disruptive effect on the business. This is where functional maturity measurement plays its part.

SOC Importance in Modern-day Defense Arena
Security Operations Centers (SOCs) are centers of expertise for numerous organizations, where information and skills related to cyber security are collected.

The SOC is where experienced professionals gather, process, and analyze log data collected throughout the company’s digital assets to identify signs of cyber risks in the infrastructure. Thus, the SOC delivers value to the company by strengthening the organization’s resistance to cyber threats and minimizing the harm caused by cyberattacks.

ThreatCure SOC Maturity Assessment Tool:
We will be able to determine the organization’s SOC’s strengths and limitations with the use of ThreatCure SOC maturity assessment management tool. It also enables for the assessment of SOC growth, demonstrating the return on investment in the SOC. The SOC maturity assessment will assist the client in benchmarking its maturity against CMM levels, allowing management to establish a roadmap for SOCs moving ahead and evolving to give the maximum value to the firm.

ThreatCure SOC Assessment Methodology:
The establishment of the SOC maturity assessment model was an essential milestone in the research, but it was not the last. Threatcure services along with an assessment tool will develop and validate the results in numerous iterations to get a more specific outcome. This assessment exercise goes beyond modeling to provide a technique for identifying any SOC’s present capability maturity level.
In simple terms, it rates organizations along a 6 point scale called a Capability Maturity Model. The levels of Maturity are:

- CMM 0 – Not Performed
- CMM 1 – Performed Informally
- CMM 2 – Planned & Tracked
- CMM 3 – Well-Defined
- CMM 4 – Quantitatively Controlled
- CMM 5 – Continuously Improving

These 6 levels are plotted against two axes: Cost & Complexity, and Maturity level (people, processes & technology).

ThreatCure Workshop:
ThreatCure experienced professionals will lead an evaluation session with several SOC specialists, ideally with diverse roles (engineers, analysts, etc.) and viewpoints. A varied array of persons attending the session is more likely to spark discourse. A discussion like this can spark new ideas and contribute value beyond measurement.

ThreatCure Engagement Outcome:
When the assessment is finished, the SOC maturity assessment results section displays the final scores in a table and graph. A big radar chart displays the maturity score for each component of the SOC. Capacity is assessed on technology and services (0–3), while maturity is measured on a 0–5 scale.`
};

// ThreatCure Breach Response Service (TBRS)
export const tbrsService = {
  title: "ThreatCure Breach Response Service (TBRS)",
  content: `In the digital age, the security of data is paramount. With the increasing sophistication of cyber threats, businesses need robust mechanisms to respond to breaches effectively. ThreatCure, as a leading cybersecurity breach response organization with a specialized team, offers the Breach Response Service (TBRS) to ensure that organizations are equipped to handle and recover from cyber breaches swiftly and efficiently.

What is ThreatCure Breach Response (TBRS)?
ThreatCure Breach Response (TBRS) refers to the set of actions and procedures that an organization undertakes in the aftermath of a cyber breach. This can range from a data breach, where sensitive information is accessed without authorization, to more aggressive threats like ransomware attacks. The primary goal of breach response is to contain the damage, ensure data integrity, and restore normalcy while minimizing financial, operational, and reputational impacts.

Key Insights:
Ransomware Attack:
Malicious software that encrypts data, holding it hostage until a ransom is paid.

Data Exfiltration:
The unauthorized transfer of data from its original source to an external destination.

Data Breach:
Unauthorized access to sensitive data, potentially leading to data compromise.

How It Works:
The efficacy of a breach response lies in its timely and systematic execution. Here’s a breakdown:

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
ThreatCure ensures your organization is prepared with tools, training, and strategies to prevent future breaches.

Holistic Recovery:
All vulnerabilities are addressed and systems fortified against upcoming cyber threats.

Expertise in Ransomware:
Specialized in handling ransomware attacks and restoring business continuity.

Immediate Response:
On standby 24/7, ThreatCure responds the moment a breach is detected.

Conclusion:
In the face of evolving cyber threats, ThreatCure’s Breach Response Service (TBRS) provides assurance and resilience. Whether it’s a data breach, ransomware attack, or any form of compromise, ThreatCure ensures swift, effective, and lasting solutions. Trust ThreatCure to safeguard your digital assets and guide your organization confidently through post-breach challenges.`
};

// Managed SOC Services by ThreatCure
export const managedSocService = {
  title: "Managed SOC Services by ThreatCure",
  content: `Security can be volatile if threats are stronger. To keep your organization secure, you always need a robust Security Operations Center (SOC). In the ever‑evolving digital landscape, threats are becoming more sophisticated and frequent. ThreatCure’s Managed Security Operations Center (SOC) services provide businesses with a powerful defense framework. We monitor, detect, and respond to cyber threats, ensuring your organization remains protected against digital adversaries.

Key Features:
24/7 Monitoring:
ThreatCure’s cybersecurity experts provide round‑the‑clock monitoring of your IT infrastructure, ensuring real‑time threat detection.

Advanced Threat Detection:
Using cutting‑edge tools and technologies, ThreatCure identifies both traditional and emerging threats to keep your business secure.

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

Cost‑Effective:
Building an in‑house SOC is expensive. ThreatCure offers a cost‑efficient alternative without compromising quality.

Access to Experts:
ThreatCure’s seasoned cybersecurity professionals ensure your organization's safety.

Peace of Mind:
With ThreatCure managing your security, you can focus confidently on core business operations.

Why Choose ThreatCure?
Industry Recognition:
ThreatCure is a premier cybersecurity entity recognized for delivering top‑tier security solutions.

Cutting‑Edge Technology:
Powered by our ShieldOps Platform and continuous research efforts, clients receive unmatched event visibility.

Client Testimonials:
Our satisfied clients stand as proof of the effectiveness and reliability of ThreatCure’s SOC services.

Secure Your Business with ThreatCure:
Care is better than cure, and cure is better than endure. Don’t let your business become an easy target for cyber threats. Organizations face routine malicious incidents — ThreatCure helps reshape your security architecture into a strong, thriving foundation.

Reach out to ThreatCure today and explore how our Managed SOC services can strengthen your digital defenses. Visit our solutions page for more details.`
};

// ThreatCure Cloud Security Management Services (CSMS)
export const csmsService = {
  title: "ThreatCure Cloud Security Management Services (CSMS)",
  content: `Cloud security is a critical aspect of modern enterprises as they transition toward digital transformation and adopt cloud-based tools and services. Cloud Security Management Services (CSMS) encompass a set of procedures, technologies, and best practices designed to mitigate internal and external security threats. As organizations adopt cloud migration strategies, they face new challenges in balancing productivity and security.

Cloud Adoption Challenges:
Cloud security practices are essential to manage internal and external threats. With businesses integrating cloud services into their operations, the need for structured cloud security becomes increasingly vital.

Terms like “digital transformation” and “cloud migration” reflect the growing need for modernization. However, as organizations work to enhance operational strategies, challenges arise—especially in maintaining security while maximizing productivity. Cloud environments introduce both opportunities and risks, especially when large-scale migrations are not executed securely.

Striking the right balance requires adopting modern cloud technologies while implementing the best cloud security practices.

How ThreatCure Cloud Security Management Services (CSMS) Works:
Businesses are migrating from on-prem to cloud, multi-cloud, or hybrid environments. Therefore, cybersecurity architectures must remain flexible and adapt to rapid changes.

According to IBM Institute for Business Value (IBV), nearly 90% of cloud investment goes to public or hybrid clouds, while 40% of workloads operate across multiple clouds. This shift demands a modern security approach where trust boundaries evolve in real-time.

ThreatCure CSMS uses an advanced Cloud Security Posture Management (CSPM) methodology to help organizations adapt to these rapid developments. Based on the NIST 5 Pillars framework:

Identify:
Identify types of threats and all assets at risk.

Protect:
Analyze how to safeguard the identified assets.

Detect:
Define methods for detecting threats impacting assets.

Respond:
Outline response strategies for detected threats.

Recover:
Define steps to restore impacted infrastructure and maintain overall security
`
};


// Managed Defense and Response by ThreatCure
export const mdrService = {
  title: "Managed Defense and Response by ThreatCure",
  content: `Managed Detection and Response (MDR) is an outsourced service that assists organizations in identifying threats and responding to them after detection. MDR adds a strong human element by giving clients access to skilled security researchers and engineers who monitor networks, analyze incidents, and respond to security events.

NEXT-GEN Defense and Response Platform (NDRP):
A major challenge for modern enterprises is responding quickly to sophisticated attacks. One of the biggest issues is the lack of integration among security tools. While large organizations may acquire multiple technologies and hire full-time threat hunters, small and medium-sized businesses often lack the resources. These organizations are frequent targets yet lack the means to build advanced security infrastructures.

ThreatCure solves this by combining Governance, Risk & Compliance (GRC), Security Information and Event Management (SIEM), and Security Orchestration & Automation Response (SOAR) technologies into a unified Next-Gen MDR platform. SIEM tools typically perform:
- Gathering, analyzing, and presenting security-related data
- Real-time analysis of alerts
- Auditing and reviewing logs
- Logging security data and generating reports
- Conducting incident response
- Managing incidents end-to-end
- Ensuring compliance

Compliance:
ThreatCure NDPR simplifies compliance for organizations subject to data security and privacy regulations. By analyzing transaction logs and access logs, organizations can ensure no unauthorized users have accessed sensitive data.

MDR Investigation – Incident Investigation:
After a breach is discovered, SecOps teams use ThreatCure NDPR to quickly determine how the attack happened, which systems were impacted, and what vulnerabilities were exploited. NDPR uses machine learning to distinguish between false positives and real threats and forecasts repeating attack patterns.

NDPR Use Cases:
- Governance process optimization for SOC
- Proactive Threat Hunting
- Threat examination and analysis
- Risk & Compliance supervision
- Reduction of duplicate events and false positives
- Workflow automation using ML (suggested playbooks)
- Support for complex enterprise environments
- Quick integration with tools and proprietary solutions with minimal coding
- Automated enrichment and correlation
- End-to-end case management from detection to remediation

Modernizing the Next-Gen SOC with ThreatCure MDR:
Modern SOCs cannot rely on manual work due to the massive volume of data processed daily. ThreatCure NDPR automates time-consuming tasks, integrates multiple technologies, and provides meaningful insights to help CISOs lead security operations effectively.

Every organization has unique tools, teams, and processes. Flexibility is essential. ThreatCure NEXT-Gen Defense and Response Platform integrates seamlessly with SIEM and other technologies, enabling cyber teams to build and optimize their incident response processes efficiently.
`
};