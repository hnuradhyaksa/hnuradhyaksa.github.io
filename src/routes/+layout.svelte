<script>
    export let data;
</script>

<svelte:head>
    <title>{data.siteMetadata.title}</title>
    <meta name="description" content={data.siteMetadata.description} />
    <meta name="author" content={data.siteMetadata.author} />
    <link rel="canonical" href={data.siteMetadata.url} />

    <meta property="og:title" content={data.siteMetadata.title} />
    <meta property="og:url" content={data.siteMetadata.url} />
    
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "{data.siteMetadata.author}",
            "url": "{data.siteMetadata.url}",
            "sameAs": [
                "{data.siteMetadata.github}"
            ]
        }
    </script>
</svelte:head>

<slot />