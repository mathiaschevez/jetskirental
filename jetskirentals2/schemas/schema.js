import createSchema from 'part:@sanity/base/schema-creator'

import schemaTypes from 'all:part:@sanity/base/schema-type'
import jetski from './jetski'
import blockedDays from './blockedDays'
import extra from './extra'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    jetski, blockedDays, extra
  ]),
})
