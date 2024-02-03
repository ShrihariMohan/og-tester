(async function (event) {
  console.log("🔥 ~ getOgTags ~ event:", event)

  const ogTags = {}

  const ogTagsValues = {
    // Og Tags
    "og-title": null,
    "og-description": null,
    "og-image": null,
    "og-url": null,
    "og-type": null,
    "og-image-height": null,
    "og-image-width": null,
    // Twitter Tags
    "twitter-title": null,
    "twitter-description": null,
    "twitter-card": null,
    "twitter-image": null,
    "title": document.querySelector('title')?.getInnerHTML() ?? null,

  }

  const ogTagsKeys = [
    { tag: 'meta[name="twitter:title"]', key: "twitter-title" },
    { tag: 'meta[name="twitter:card"]', key: "twitter-card" },
    { tag: 'meta[name="twitter:description"]', key: "twitter-description" },
    { tag: 'meta[name="twitter:image"]', key: "twitter-image" },
    { tag: 'meta[property="og:title"]', key: "og-title" },
    { tag: 'meta[property="og:description"]', key: "og-description" },
    { tag: 'meta[property="og:image"]', key: "og-image" },
    { tag: 'meta[property="og:url"]', key: "og-url" },
    { tag: 'meta[property="og:image:height"]', key: "og-image-height" },
    { tag: 'meta[property="og:image:width"]', key: "og-image-width" },
    { tag: 'meta[property="og:type"]', key: "og-type" },

  ]


  for (let i = 0; i < ogTagsKeys.length; i++) {
    const currTag = ogTagsKeys[i]
    const value = document.querySelector(currTag.tag)?.getAttribute('content');
    console.log("🔥 ~ document.getElementById ~ value:", currTag.key, value)
    ogTags[currTag.key] = value ?? null
  }

  const metaTagsCollection = document.getElementsByTagName('meta');
  let metaTags = ''
  for (let i = 0; i < metaTagsCollection.length; i++) {
    const item = metaTagsCollection[i].outerHTML
    metaTags += item
  }


  console.log("🔥 ~ metaTags:", metaTags)
  console.log(ogTags)

  const req = await fetch('https://localhost-og-checker.vercel.app/api/v1/createpreview', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ogTags, metaTags })
  }).then((data) => data.json()).then(data => window.open(`https://localhost-og-checker.vercel.app/${data.id}`)).catch(console.error)


})()








