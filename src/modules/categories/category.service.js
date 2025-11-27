import { makeCategoryRepoSequelize } from "./category.repo.sequelize.js"

export const makeCategoryService = () => {
    const repo = makeCategoryRepoSequelize()

    const list = async () => {
        return await repo.list()
    }

    return { list }
}