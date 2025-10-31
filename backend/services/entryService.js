import prisma from "../config/db.js";

export const entryService = {
  async createEntry(userId, data) {
    if (data.type === "TV Show") data.type = "TV_Show";

    const entry = await prisma.entry.create({
      data: { ...data, userId },
    });

    return this.formatEntry(entry);
  },

 async getEntries(userId, page = 1, limit = 10, search = "", type = "") {
  const skip = (page - 1) * limit;

  const formattedType = type === "TV Show" ? "TV_Show" : type;

  const where = {
    userId,
    ...(search && { title: { contains: search } }),
    ...(formattedType && { type: formattedType }),
  };

  const [entries, total] = await Promise.all([
    prisma.entry.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.entry.count({ where }),
  ]);

  return {
    data: entries.map(this.formatEntry),
    pagination: {
      totalItems:total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
},

  async getEntryById(id, userId) {
    const entry = await prisma.entry.findUnique({ where: { id } });

    if (!entry || entry.userId !== userId) {
      const error = new Error("Entry not found");
      error.statusCode = 404;
      throw error;
    }

    return this.formatEntry(entry);
  },

  async updateEntry(id, userId, data) {
    if (data.type === "TV Show") data.type = "TV_Show";

    const entry = await prisma.entry.findUnique({ where: { id } });

    if (!entry || entry.userId !== userId) {
      const error = new Error("Entry not found");
      error.statusCode = 404;
      throw error;
    }

    const updated = await prisma.entry.update({
      where: { id },
      data,
    });

    return this.formatEntry(updated);
  },

  async deleteEntry(id, userId) {
    const entry = await prisma.entry.findUnique({ where: { id } });

    if (!entry || entry.userId !== userId) {
      const error = new Error("Entry not found");
      error.statusCode = 404;
      throw error;
    }

    return await prisma.entry.delete({ where: { id } });
  },


  formatEntry(entry) {
    return {
      ...entry,
      type: entry.type === "TV_Show" ? "TV Show" : entry.type,
    };
  },
};
