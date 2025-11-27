import { makeCategoryService } from "./category.service.js"

export const makeCategoryController = () => {
    const service = makeCategoryService()

    const list = async (request, response, next) => {
        try {
            const categories = await service.list()

            return response.json(categories)
        } catch (error) {
            next(error)
        }
    }

    return { list }
}