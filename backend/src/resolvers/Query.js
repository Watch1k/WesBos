const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  async item(parent, args, ctx, info) {
    const item = await ctx.db.query.item(args);

    if (!item) throw new Error('No item found');

    return item;
  },
  itemsConnection: forwardTo('db'),
};

module.exports = Query;
