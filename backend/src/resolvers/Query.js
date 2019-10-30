const { hasPermissions } = require('../utils')
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
    hasPermissions(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    return ctx.db.query.users({}, info)
  },
  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in')
    }
    const order = await ctx.db.query.order({
      where: { id: args.id },
    }, info)
    const ownsOrder = order.user.id === ctx.request.userId
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN')
    if (!ownsOrder || !hasPermissionToSeeOrder) {
      throw new Error('You cant see  this buddd')
    }
    return order
  },
  async orders(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in')
    }
    return await ctx.db.query.orders({
      where: { user: { id: ctx.request.userId } },
    }, info)
  },
}

module.exports = Query
