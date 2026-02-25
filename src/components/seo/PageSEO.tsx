import Head from 'next/head';

const SITE_URL = 'https://uixplor.com';
const SITE_NAME = 'UIXplor';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;
const TWITTER_SITE = '@uixplor';

interface PageSEOProps {
	title: string;
	description: string;
	path: string;
	ogImage?: string;
	type?: 'website' | 'article';
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
	tags?: string[];
	keywords?: string[];
	noindex?: boolean;
	jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export default function PageSEO({
	title,
	description,
	path,
	ogImage = DEFAULT_OG_IMAGE,
	type = 'website',
	publishedTime,
	modifiedTime,
	author = 'UIXplor Team',
	tags = [],
	keywords = [],
	noindex = false,
	jsonLd,
}: PageSEOProps) {
	const canonical = `${SITE_URL}${path}`;
	// Title: if already contains UIXplor brand, use as-is; otherwise append
	const fullTitle = title.includes('UIXplor') ? title : `${title} — ${SITE_NAME}`;
	// Safety clamp: warn in dev if title >65 chars
	const safeDescription = description.length > 160 ? description.slice(0, 157) + '...' : description;

	// Normalize jsonLd to array
	const schemas = jsonLd
		? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
		: [];

	return (
		<Head>
			{/* ── Core ─────────────────────────────────────── */}
			<title>{fullTitle}</title>
			<meta name="description" content={safeDescription} />
			{keywords.length > 0 && (
				<meta name="keywords" content={keywords.join(', ')} />
			)}
			<meta name="author" content={author} />
			{noindex ? (
				<meta name="robots" content="noindex, nofollow" />
			) : (
				<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
			)}
			<link rel="canonical" href={canonical} />

			{/* ── OpenGraph ────────────────────────────────── */}
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={SITE_NAME} />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={safeDescription} />
			<meta property="og:url" content={canonical} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:image:alt" content={`${SITE_NAME} – ${title}`} />
			<meta property="og:locale" content="en_US" />

			{/* ── Twitter / X ──────────────────────────────── */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content={TWITTER_SITE} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={safeDescription} />
			<meta name="twitter:image" content={ogImage} />
			<meta name="twitter:image:alt" content={`${SITE_NAME} – ${title}`} />

			{/* ── Article-specific ─────────────────────────── */}
			{type === 'article' && publishedTime && (
				<meta property="article:published_time" content={publishedTime} />
			)}
			{type === 'article' && modifiedTime && (
				<meta property="article:modified_time" content={modifiedTime} />
			)}
			{type === 'article' && author && (
				<meta property="article:author" content={author} />
			)}
			{type === 'article' && tags.map(tag => (
				<meta key={tag} property="article:tag" content={tag} />
			))}

			{/* ── JSON-LD Structured Data ───────────────────── */}
			{schemas.map((schema, i) => (
				<script
					key={i}
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
				/>
			))}
		</Head>
	);
}
