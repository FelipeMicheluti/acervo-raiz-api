import { Op } from "sequelize"
import { Report } from "../../models/Report.js"
import { User } from "../../models/User.js"
import { Category } from "../../models/Category.js"

export const makeReportRepoSequelize = () => {
  return {
    async create({ title, content, originLocation, categoryId, createdBy }) {
      const report = await Report.create({ title, content, originLocation, categoryId, createdBy })

      return report.toJSON()
    },

    async findById({ id }) {
      const report = await Report.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'name']
          },
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ]
      })

      return report ? report.toJSON() : null
    },

    async findAll({ q, page = 1, limit = 10, order = 'id', dir = 'ASC' }) {
      const where = {}


      if (q) {
        where.title = { [Op.like]: `%${q}%` };

      }

      const offset = (page - 1) * limit;

      const { count, rows } = await Report.findAndCountAll({
        where,
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }],
        limit,
        offset,
        order: [[order, dir]]
      });

      return {
        items: rows.map(p => p.toJSON()),
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      };
    },
    async update({ id, data }) {
      const report = await Report.findByPk(id)
      if (!report) return null

      await report.update(data)
      return report.toJSON()
    },

    async delete({ id }) {
      const report = await Report.findByPk(id)
      if (!report) return false

      await report.destroy()
      return true
    }
  }
}