// Define the structure of an article
export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
}

// Mock data for our articles
const articles: Article[] = [
  {
    slug: "top-5-hikes-in-svaneti",
    title: "Top 5 Hikes in Svaneti",
    description:
      "Discover the most breathtaking hiking trails in the majestic Svaneti region.",
    content:
      "Svaneti is a hiker's paradise. Here are our top 5 recommended trails...",
  },
  {
    slug: "georgian-wine-making-kakheti",
    title: "A Guide to Georgian Wine in Kakheti",
    description:
      "Explore the ancient traditions of qvevri wine-making in Georgia's primary wine region, Kakheti.",
    content:
      "The Kakheti region is the heart of Georgian viticulture. For 8,000 years...",
  },
  {
    slug: "exploring-old-tbilisi",
    title: "Exploring the Charm of Old Tbilisi",
    description:
      "Wander through the cobblestone streets, historic bathhouses, and vibrant culture of Old Tbilisi.",
    content:
      "Old Tbilisi is a city of contrasts, where ancient churches stand alongside modern architecture...",
  },
];

// CORRECTED: This function is synchronous, so we remove 'async' and 'Promise'.
export const getArticles = (): Article[] => {
  return articles;
};

// CORRECTED: This function is also synchronous.
export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((article) => article.slug === slug);
};
