export default {
  name: 'extra',
  title: 'Extra',
  type: 'document',
  fields: [
    {
      name: 'extra',
      title: 'Extra',
      type: 'array',
      of: [{ type: 'document'}],
    },
  ]
}