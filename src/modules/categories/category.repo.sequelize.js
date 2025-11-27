import { Category } from "../../models/Category.js"

export const makeCategoryRepoSequelize = () => {
    const list = async () => {
        const categories = await Category.findAll()

        return categories.map(category => category.toJSON())
    }

    return { list }
}