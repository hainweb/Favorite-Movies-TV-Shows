import { entryService } from "../services/entryService.js";

export const entryController = {
  async createEntry(req, res, next) {
    try {
      const entry = await entryService.createEntry(req.userId, req.body);

      res.status(201).json({
        success: true,
        message: "Entry created successfully",
        entry,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEntries(req, res, next) {
    try {
      const page = Number.parseInt(req.query.page) || 1;
      const limit =  10;
      const search = req.query.search || "";
      const type = req.query.type || "";

      const result = await entryService.getEntries(
        req.userId,
        page,
        limit,
        search,
        type
      );

      res.status(200).json({
        success: true,
        message: "Entries retrieved successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getEntryById(req, res, next) {
    try {
      const entry = await entryService.getEntryById(
        Number.parseInt(req.params.id),
        req.userId
      );

      res.status(200).json({
        success: true,
        message: "Entry retrieved successfully",
        entry,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateEntry(req, res, next) {
    try {
      const entry = await entryService.updateEntry(
        Number.parseInt(req.params.id),
        req.userId,
        req.body
      );

      res.status(200).json({
        success: true,
        message: "Entry updated successfully",
        entry,
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteEntry(req, res, next) {
    try {
      await entryService.deleteEntry(
        Number.parseInt(req.params.id),
        req.userId
      );

      res.status(200).json({
        success: true,
        message: "Entry deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
