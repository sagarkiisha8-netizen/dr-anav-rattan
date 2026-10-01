import { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/lib/siteConfig";
import { getSiteContent, defaultSiteContent } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Core public static pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/services"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/doctors"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/book-appointment"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/research"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/faqs"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/gallery"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Retrieve published services and doctors with graceful fallback
  let services = defaultSiteContent.services;
  let doctors = defaultSiteContent.doctors;

  try {
    const siteContent = await getSiteContent();
    if (siteContent?.services && Array.isArray(siteContent.services) && siteContent.services.length > 0) {
      services = siteContent.services;
    }
    if (siteContent?.doctors && Array.isArray(siteContent.doctors) && siteContent.doctors.length > 0) {
      doctors = siteContent.doctors;
    }
  } catch (error) {
    console.warn("Sitemap: Falling back to defaultSiteContent:", error);
  }

  // Individual clinical service pages
  const serviceRoutes: MetadataRoute.Sitemap = (services || [])
    .filter((service) => service.isPublished !== false && Boolean(service.slug))
    .map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  // Individual doctor profile pages
  const doctorRoutes: MetadataRoute.Sitemap = (doctors || [])
    .filter((doctor) => doctor.isPublished !== false && Boolean(doctor.slug))
    .map((doctor) => ({
      url: absoluteUrl(`/doctors/${doctor.slug}`),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Ensure absolute uniqueness of all generated URLs
  const seenUrls = new Set<string>();
  const finalSitemap: MetadataRoute.Sitemap = [];

  for (const entry of [...coreRoutes, ...serviceRoutes, ...doctorRoutes]) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      finalSitemap.push(entry);
    }
  }

  return finalSitemap;
}
