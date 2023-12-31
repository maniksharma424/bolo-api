import express from "express";
import {
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getOneProduct,


} from "./ProductController.js"
const router = express.Router();
import { isAuthenticatedUser, authorizeRoles } from "../../middlewares/auth.js"
router.route("/product/create/").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
router.route("/product/getAll/").get(getAllProduct)
router.route("/product/getOne/:id").get(getOneProduct)
router.route("/product/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/product/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

export default router;


