import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogsDirectory = path.join(process.cwd(), 'public', 'contents', 'blogs');
// Get all blog data for listing
export async function getAllBlogs() {
  try {
    // Check if directory exists
    if (!fs.existsSync(blogsDirectory)) {
      console.error('Blogs directory not found:', blogsDirectory);
      return [];
    }

    const fileNames = fs.readdirSync(blogsDirectory).filter(file => file.endsWith('.md'));
    
    const allBlogsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        
        // Read markdown file as string
        const fullPath = path.join(blogsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        
        // Get excerpt (first 150 characters of content)
        const excerpt = matterResult.content
          .replace(/#|\*|`/g, '')
          .substring(0, 150)
          .trim() + '...';
        
        // Ensure image path is correct (your logic here is fine)
        let image = matterResult.data.image || '/blogs/default-blog.jpg';
        
        // If image path is relative, ensure it starts with /
        if (image && !image.startsWith('http') && !image.startsWith('/')) {
          image = `/blogs/${image}`;
        }
        
        return {
          slug,
          excerpt,
          // 💡 CORRECTION: Remove the full 'content' here
          // content: matterResult.content, // <-- DELETE THIS LINE
          // 💡 CORRECTION: Add a placeholder property for reading time calculation
          contentWords: matterResult.content.split(/\s+/).length, // Include word count instead of content
          image,
          title: matterResult.data.title || 'Untitled Article',
          description: matterResult.data.description || excerpt,
          date: matterResult.data.date || new Date().toISOString(),
          category: matterResult.data.category || 'Security'
        };
      })
    );
    
    // Sort posts by date
    return allBlogsData.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

// Get single blog data by slug
export async function getBlogBySlug(slug) {
  try {
    if (!slug) {
      return null;
    }
    
    // 💡 FIX: Normalize the incoming slug to lowercase for file system lookup
    const normalizedSlug = slug.toLowerCase();
    
    // Use the normalized slug when constructing the path
    const fullPath = path.join(blogsDirectory, `${normalizedSlug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      // This log will now show the exact (lowercase) path it failed to find.
      console.error(`Blog file not found: Tried path ${fullPath}`); 
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    // ... (image logic)
    let image = matterResult.data.image || '/blogs/default-blog.jpg';
    if (image && !image.startsWith('http') && !image.startsWith('/')) {
        image = `/blogs/${image}`;
    }

    return {
        slug: normalizedSlug, // Return the normalized slug
        content: matterResult.content, 
        image,
        title: matterResult.data.title || 'Untitled Article',
        description: matterResult.data.description || matterResult.data.excerpt || 'No description available',
        date: matterResult.data.date || new Date().toISOString(),
        category: matterResult.data.category || 'Security'
    };
  } catch (error) {
    console.error(`Fatal error during markdown parsing for slug "${slug}":`, error);
    return null;
  }
}

// Get recent blogs for homepage
export async function getRecentBlogs(limit = 3) {
  const allBlogs = await getAllBlogs();
  return allBlogs.slice(0, limit);
}

// Get all blog slugs (file names without .md)
export function getAllBlogSlugs() {
  try {
    const fileNames = fs.readdirSync(blogsDirectory).filter(file => file.endsWith('.md'));
    return fileNames.map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
  } catch (error) {
    console.error('Error getting blog slugs:    ', error);
    return [];
  }
}