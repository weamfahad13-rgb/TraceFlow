
 // searchService.js — يجلب المعلومات من مصادر مجانية

function cleanText(text) {
  return text
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// 1. البحث في arXiv
export async function searchArxiv(topic) {
  const query = encodeURIComponent(topic);
  const url = `https://export.arxiv.org/api/query?search_query=all:${query}&max_results=7&sortBy=submittedDate&sortOrder=descending`;

  try {
    const res = await fetch(url);
    const xml = await res.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    return entries.map((entry) => {
      const content = entry[1];

      const title = cleanText(
        content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""
      );

      const summary = cleanText(
        content.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] || ""
      );

      const link = cleanText(
        content.match(/<id>([\s\S]*?)<\/id>/)?.[1] || ""
      );

      const published = cleanText(
        content.match(/<published>([\s\S]*?)<\/published>/)?.[1] || ""
      );

      return {
        title,
        summary: summary.slice(0, 1200),
        link,
        published,
        source: "arXiv",
      };
    });
  } catch (error) {
    console.error("arXiv search error:", error.message);
    return [];
  }
}

// 2. Hugging Face Papers RSS
export async function searchHuggingFace(topic) {
  const url = `https://huggingface.co/papers/rss?q=${encodeURIComponent(topic)}`;

  try {
    const res = await fetch(url);
    const xml = await res.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    return items.slice(0, 7).map((item) => {
      const content = item[1];

      const title = cleanText(
        content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""
      );

      const link = cleanText(
        content.match(/<link>([\s\S]*?)<\/link>/)?.[1] || ""
      );

      const desc = cleanText(
        content.match(/<description>([\s\S]*?)<\/description>/)?.[1] || ""
      );

      const published = cleanText(
        content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || ""
      );

      return {
        title,
        link,
        summary: desc.slice(0, 900),
        published,
        source: "Hugging Face",
      };
    });
  } catch (error) {
    console.error("Hugging Face search error:", error.message);
    return [];
  }
}

// 3. TechCrunch AI RSS
export async function searchAINews(topic) {
  const url = "https://techcrunch.com/tag/artificial-intelligence/feed/";

  try {
    const res = await fetch(url);
    const xml = await res.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
    const keyword = topic.toLowerCase().split(" ")[0];

    const news = items.slice(0, 15).map((item) => {
      const content = item[1];

      const title = cleanText(
        content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""
      );

      const link = cleanText(
        content.match(/<link>([\s\S]*?)<\/link>/)?.[1] || ""
      );

      const desc = cleanText(
        content.match(/<description>([\s\S]*?)<\/description>/)?.[1] || ""
      );

      const published = cleanText(
        content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || ""
      );

      return {
        title,
        link,
        summary: desc.slice(0, 700),
        published,
        source: "TechCrunch",
      };
    });

    const filtered = news.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );

    return filtered.length > 0 ? filtered.slice(0, 5) : news.slice(0, 5);
  } catch (error) {
    console.error("AI news search error:", error.message);
    return [];
  }
}