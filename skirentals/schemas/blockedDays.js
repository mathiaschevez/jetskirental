export default {
  name: 'blockedDays',
  title: 'Blocked Days',
  type: 'document',
  fields: [
    {
      name: 'blockedDays',
      title: 'Blocked Days',
      type: 'array',
      of: [{ type: 'date'}],
    },
  ]
}