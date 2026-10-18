export const resumeUrl = "/Nipun_Grover_Resume.pdf";

// Content and dates from the supplied resume. Keep the homepage summaries brief.
export const experience = [
  {
    id: "loblaw",
    company: "Loblaw Companies Limited",
    role: "Analyst, Transport Management",
    dates: "May 2026 — Present",
    location: "Cambridge, ON",
    featured: true,
    summary: "Automating transportation reporting and data workflows, improving operational data quality, and building tools that reduce manual work.",
    overview: "Support transportation analytics with Power BI, SQL, BigQuery, Python and Power Automate. Build recurring reporting, workflow automation and independent data collection to support transportation operations, maintenance and cost analysis.",
    details: [
      "Automated KPI reporting into BigQuery and scheduled refreshes, eliminating about 30 minutes of manual work per business day (approximately 130 hours annually).",
      "Automated Vehicle Activity Tracker refreshes in Power BI, removing about 10 minutes of manual work per business day (approximately 43 hours annually).",
      "Built Power Automate and SharePoint workflows for DCFC charger issue routing by location, avoiding an estimated 5–8 minutes of manual handling per submission.",
      "Corrected missing SLC truck mileage and operational metrics, including vehicle assignment driver counts, to improve reporting accuracy.",
      "Built independent reefer runtime data collection to overcome Lynx limitations and preserve history for maintenance and cost analysis.",
      "Coordinated platform access for the NSC CVOR Agent AI initiative supporting carrier safety document management.",
      "Built a vendor email automation pipeline using an Agent AI platform on GCP, saving more than 25 hours annually on collecting responses from unstructured emails."
    ],
    technologies: ["Power BI", "SQL", "BigQuery", "Python", "Power Automate", "SharePoint", "GCP"]
  },
  {
    id: "varlab",
    company: "Virtual/Augmented Reality Lab (VARLab)",
    role: "Full Stack Developer (Co-op)",
    dates: "Sep 2024 — Aug 2025",
    location: "Waterloo, ON",
    featured: true,
    summary: "Built an internal asset management tool for 20+ Unity developers and faculty, helping teams manage content themselves and update it in real time.",
    overview: "Developed an internal asset management tool with React, TypeScript, Express and MongoDB. Worked with technical and non-technical users to gather requirements and deliver a self-service content editor for AR/VR development teams.",
    details: [
      "Built an asset management tool used by more than 20 Unity developers and faculty.",
      "Created a self-service editor that reduced content updates from days to real time.",
      "Implemented Google OAuth 2.0 and JWT authentication, and achieved 84% unit test coverage using Vitest, Jest and React Testing Library.",
      "Added a local fallback to a shared Unity/Azure Cloud Save package so simulations could continue when Azure was unavailable."
    ],
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Google OAuth 2.0", "JWT", "Vitest", "Jest", "React Testing Library", "Unity", "Azure Cloud Save"]
  },
  {
    id: "mcdonalds",
    company: "McDonald’s",
    role: "Crew Member (Part-time)",
    dates: "Oct 2022 — May 2026",
    featured: false
  },
  {
    id: "civic-tech",
    company: "Civic Tech KW",
    role: "Volunteer Developer",
    dates: "Feb 2025 — Jan 2026",
    summary: "Helped build a Next.js volunteer directory and community website.",
    featured: false
  }
];
