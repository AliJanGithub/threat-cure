import fs from 'fs';
import path from 'path';

const pdfsDirectory = path.join(process.cwd(), 'public', 'pdfs');

export async function getAllPDFs() {
  try {
    // Check if directory exists
    if (!fs.existsSync(pdfsDirectory)) {
      console.warn('PDFs directory not found:', pdfsDirectory);
      // Create the directory
      fs.mkdirSync(pdfsDirectory, { recursive: true });
      console.log('Created PDFs directory');
      return getSamplePDFs();
    }

    // Get all PDF files
    const fileNames = fs.readdirSync(pdfsDirectory).filter(file => 
      file.toLowerCase().endsWith('.pdf')
    );
    
    console.log('Found PDF files:', fileNames); // Debug log
    
    if (fileNames.length === 0) {
      console.warn('No PDF files found in', pdfsDirectory);
      return getSamplePDFs();
    }
    
    const pdfs = fileNames.map(fileName => {
      const filePath = path.join(pdfsDirectory, fileName);
      const stats = fs.statSync(filePath);
      
      // Remove extension and format the title
      const baseName = fileName.replace(/\.pdf$/i, '');
      
      // Create a better title from filename
      let title = baseName
        .split(/[-_]/)
        .map(word => {
          // Handle common abbreviations
          if (word.toLowerCase() === 'soc') return 'SOC';
          if (word.toLowerCase() === 'ai') return 'AI';
          if (word.toLowerCase() === 'pdf') return '';
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .filter(word => word !== '')
        .join(' ');
      
      // If title is empty or too short, use the filename
      if (!title || title.length < 3) {
        title = baseName.charAt(0).toUpperCase() + baseName.slice(1);
      }
      
      // Determine category based on filename
      let category = 'Resource';
      const fileNameLower = fileName.toLowerCase();
      
      if (fileNameLower.includes('security') || fileNameLower.includes('cyber')) {
        category = 'Security';
      } else if (fileNameLower.includes('cloud')) {
        category = 'Cloud';
      } else if (fileNameLower.includes('ai') || fileNameLower.includes('artificial')) {
        category = 'AI';
      } else if (fileNameLower.includes('soc')) {
        category = 'Compliance';
      } else if (fileNameLower.includes('guide') || fileNameLower.includes('manual')) {
        category = 'Guide';
      } else if (fileNameLower.includes('report') || fileNameLower.includes('whitepaper')) {
        category = 'Report';
      }
      
      // Try to find a thumbnail image
      let thumbnail = '/blogs/default-blog.jpg'; // Default fallback
      
      // Check for image with same name
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
      for (const ext of imageExtensions) {
        const imagePath = path.join(pdfsDirectory, `${baseName}${ext}`);
        if (fs.existsSync(imagePath)) {
          thumbnail = `/pdfs/${baseName}${ext}`;
          break;
        }
      }
      
      // Create description based on title
      const descriptions = {
        'cloud-security-insights': 'Comprehensive insights into cloud security best practices and implementation strategies.',
        'cybersecurity-report': 'Latest cybersecurity threat analysis and defensive recommendations.',
        'soc-maturity-guide': 'Complete guide to achieving SOC maturity and operational excellence.'
      };
      
      const description = descriptions[baseName.toLowerCase()] || 
                         `Download ${title} - A comprehensive resource for security professionals.`;
      
      return {
        id: baseName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title,
        fileName: fileName,
        path: `/pdfs/${fileName}`, // IMPORTANT: This must be correct
        thumbnail,
        category,
        date: stats.mtime,
        fileSize: stats.size,
        size: formatFileSize(stats.size),
        description
      };
    });

    // Sort by date (newest first)
    return pdfs.sort((a, b) => new Date(b.date) - new Date(a.date));
    
  } catch (error) {
    console.error('Error reading PDFs:', error);
    return getSamplePDFs();
  }
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Sample PDFs that match your actual files
function getSamplePDFs() {
  return [
    {
      id: 'cloud-security-insights',
      title: 'Cloud Security Insights',
      fileName: 'cloud-security-insights.pdf',
      path: '/pdfs/cloud-security-insights.pdf',
      thumbnail: '/blogs/default-blog.jpg',
      category: 'Cloud',
      date: new Date('2024-01-20'),
      fileSize: 2457600,
      size: '2.4 MB',
      description: 'Comprehensive insights into cloud security best practices and implementation strategies.'
    },
    {
      id: 'cybersecurity-report',
      title: 'Cybersecurity Report',
      fileName: 'cybersecurity-report.pdf',
      path: '/pdfs/cybersecurity-report.pdf',
      thumbnail: '/blogs/default-blog.jpg',
      category: 'Security',
      date: new Date('2024-01-15'),
      fileSize: 3145728,
      size: '3 MB',
      description: 'Latest cybersecurity threat analysis and defensive recommendations.'
    },
    {
      id: 'soc-maturity-guide',
      title: 'SOC Maturity Guide',
      fileName: 'soc-maturity-guide.pdf',
      path: '/pdfs/soc-maturity-guide.pdf',
      thumbnail: '/blogs/default-blog.jpg',
      category: 'Compliance',
      date: new Date('2024-01-10'),
      fileSize: 2097152,
      size: '2 MB',
      description: 'Complete guide to achieving SOC maturity and operational excellence.'
    }
  ];
}