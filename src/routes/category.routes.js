import { Router } from "express"
import { makeCategoryController } from "../modules/categories/category.controller.js"

export const categoryRouter = () => {
    const r = Router()
    const ctrl = makeCategoryController()

    r.get("/", ctrl.list)

    return r
}