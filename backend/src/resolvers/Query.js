const { hasPermission } = require('../utils')
const { forwardTo } = require('prisma-binding')

const Query = {
  items: forwardTo('db'),
  async item(parent, args, ctx, info) {
    const item = await ctx.db.query.item(args)

    if (!item) throw new Error('No item found')

    return item
  },
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request

    if (!userId) {
      return null
    }
    return ctx.db.query.user({
      where: { id: userId },
    }, info)
  },
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in')
    }
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    return ctx.db.users({}, info)
  },
}

module.exports = Query
