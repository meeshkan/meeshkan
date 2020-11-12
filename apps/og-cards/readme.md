# Meeshkan Open Graph Cards

> On-demand Open Graph images for the [Meeshkan Website](https://meeshkan.com).

## Sample Usage

```javascript
const cardBaseUrl = "https://og-cards.meeshkan.com"
const cardUrl = `${cardBaseUrl}/card?title=${title}&tag=${tag}`
const ogImage = `${cardBaseUrl}/api/${encodeURIComponent(cardUrl)}`

return (
    <Head>
        <title>{title} | Meeshkan {tag}</title>
        <meta property="og:image" content={ogImage} />
    </Head>
)
```

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https://github.com/meeshkan/og-cards)

## License

MIT © [Meeshkan](http://meeshkan.com/)
