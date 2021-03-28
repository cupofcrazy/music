import sanityClient from '@sanity/client'

const options = {
    projectId: 'eefpfqmk',
    dataset: 'production',
    useCdn: true
}

export const query = `
    *[_type == "project"] {
        "id": _id,
        title,
        "slug": slug.current,
        "thumbnail": thumbnail.asset->,
        description,
        images[] {
        asset->,
        caption
        },
            ...,
            module[] {
        ...,
        asset->,
        "image1":image1.asset->,
        "image2": image2.asset->
        }
    }
`

export default sanityClient(options)