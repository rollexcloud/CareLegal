'use client'
import Link from "next/link"
import { HoverEffect } from "./ui/card-hover-effect";

function UpcomingWebinars() {

 const featuredWebinars = [
  {
    title: 'Introduction to Indian Legal System',
    description:
      'Gain a foundational understanding of the Indian Constitution, judiciary, and legal processes.',
    slug: 'introduction-to-indian-legal-system',
    isFeatured: true,
  },
  {
    title: 'Corporate and Business Law Essentials',
    description:
      'Explore the legal frameworks governing companies, contracts, and corporate compliance.',
    slug: 'corporate-and-business-law-essentials',
    isFeatured: true,
  },
  {
    title: 'Criminal Law: Principles and Practice',
    description:
      'Understand criminal liability, key sections of IPC, and the nuances of courtroom practice.',
    slug: 'criminal-law-principles-and-practice',
    isFeatured: true,
  },
  {
    title: 'Intellectual Property Rights Simplified',
    description:
      'Learn how copyrights, patents, and trademarks protect creative and business innovations.',
    slug: 'intellectual-property-rights-simplified',
    isFeatured: true,
  },
  {
    title: 'Legal Drafting and Documentation',
    description:
      'Master the art of drafting contracts, petitions, and legal notices with professional precision.',
    slug: 'legal-drafting-and-documentation',
    isFeatured: true,
  },
  {
    title: 'Alternative Dispute Resolution (ADR)',
    description:
      'Discover mediation, arbitration, and negotiation techniques for resolving disputes effectively.',
    slug: 'alternative-dispute-resolution',
    isFeatured: true,
  },
];



  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
        <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
  FEATURED INSIGHTS
</h2>
<p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
  Exploring Cases, Laws, and Legal Perspectives
</p>
        </div>

        <div className="mt-10">
          <HoverEffect
          items={featuredWebinars.map(webinar => (
            {
              title: webinar.title,
              description: webinar.description,
              link: '/'
            }
          ))}
          />
        </div>

      </div>
    </div>
  )
}

export default UpcomingWebinars