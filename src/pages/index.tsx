import PageSEO from '@/components/seo/PageSEO';
import Home from './Home/home';

const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'UIXplor',
    url: 'https://uixplor.com',
    description: 'Premium CSS snippets, UI components, and design resources for modern web development.',
    potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: 'https://uixplor.com/collections' },
        'query-input': 'required name=search_term_string',
    },
};

export default function Index() {
    return (
        <>
            <PageSEO
                title="UIXplor – Free CSS Snippets & Open-Source UI Library"
                description="Discover 200+ free CSS snippets and UI components. Box shadows, glassmorphism cards, hover effects, loaders, gradients and more — all copy-paste ready for your next project."
                path="/"
                keywords={['CSS snippets', 'UI components', 'CSS library', 'glassmorphism CSS', 'CSS hover effects', 'CSS box shadow', 'UI design inspiration', 'copy paste CSS']}
                jsonLd={homeJsonLd}
            />
            <Home />
        </>
    );
}
