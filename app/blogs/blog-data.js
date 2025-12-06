export const blogPosts = [
  {
    id: 'state-of-cybersecurity-2025',
    title: 'State of Cybersecurity 2025',
    description: 'Comprehensive analysis of current threat landscape and emerging attack vectors.',
    content: `
      <h2>Introduction</h2>
      <p>The cybersecurity landscape is evolving at an unprecedented pace. As we approach 2025, organizations face increasingly sophisticated threats that require advanced protection strategies.</p>
      
      <h2>Key Trends</h2>
      <p>1. <strong>AI-Powered Attacks:</strong> Threat actors are leveraging artificial intelligence to create more convincing phishing campaigns and automate attack processes.</p>
      <p>2. <strong>Cloud Vulnerabilities:</strong> With more organizations migrating to cloud infrastructure, attackers are targeting misconfigured cloud instances and APIs.</p>
      <p>3. <strong>Supply Chain Attacks:</strong> Software supply chain compromises continue to be a major concern, affecting thousands of organizations simultaneously.</p>
      
      <h2>Protection Strategies</h2>
      <ul>
        <li>Implement Zero Trust Architecture</li>
        <li>Regular security awareness training</li>
        <li>Automated threat detection and response</li>
        <li>Continuous vulnerability assessment</li>
      </ul>
    `,
    excerpt: 'Explore the latest trends in cybersecurity threats and learn how to protect your organization...',
    readTime: '8 min read',
    author: 'Alex Johnson',
    authorRole: 'Chief Security Officer',
    date: 'Mar 15, 2024',
    category: 'Research',
    image: '/blogs/cybersecurity-trends.jpg',
    tags: ['Cybersecurity', 'Trends', '2025', 'Threats'],
  },
  {
    id: 'cloud-security-best-practices',
    title: 'Cloud Security Best Practices',
    description: 'Essential strategies for securing multi-cloud environments and preventing data breaches.',
    content: `
      <h2>Securing Cloud Environments</h2>
      <p>Cloud security requires a different approach compared to traditional on-premises security. Here are the essential practices...</p>
      <!-- More content -->
    `,
    excerpt: 'Learn the most effective strategies to secure your cloud infrastructure and protect sensitive data...',
    readTime: '6 min read',
    author: 'Sarah Miller',
    authorRole: 'Cloud Security Expert',
    date: 'Feb 28, 2024',
    category: 'Cloud',
    image: '/blogs/cloud-security.jpg',
    tags: ['Cloud', 'Security', 'AWS', 'Azure'],
  },
  // Add more blog posts...
];

export const getBlogPost = (slug) => {
  return blogPosts.find(blog => blog.id === slug);
};

export const getAllBlogPosts = () => {
  return blogPosts;
};