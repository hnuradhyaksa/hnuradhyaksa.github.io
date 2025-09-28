export const prerender = true;
export const ssr = false;

export function load() {
    const siteMetadata = {
        title: 'Nur Adhyaksa | Visual Essays',
        description: 'The personal portfolio and blog of Nur Adhyaksa, showcasing projects in data visualization.',
        url: 'https://hnuradhyaksa.github.io',
        author: 'Nur Adhyaksa',
        github: 'https://github.com/hnuradhyaksa'
    };

    return {
        siteMetadata
    };
}