import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'vitr3pqf',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

//project id 2
//'nq36x7hr'

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)