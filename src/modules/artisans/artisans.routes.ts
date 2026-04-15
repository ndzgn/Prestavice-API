import { Router } from "express"
import * as artisanController from "../artisans/artisans.controller"
import { validate } from "../../middlewares/validate"
import { createArtisanSchema, updateArtisanSchema } from "../../models/Artisan"


const router = Router()

router.post("/" ,validate(createArtisanSchema),artisanController.createArtisanController)

router.get("/", artisanController.getAllActiveArtisansController)

router.get("/search", artisanController.searchArtisansController)

router.get("/verified", artisanController.getVerifiedArtisansController)

router.get("/service", artisanController.getArtisansByServiceController)

router.get("/town", artisanController.getArtisansByTownController)

router.get("/district", artisanController.getArtisansByDistrictController)

router.get("/:id", artisanController.getArtisanByIdController)

router.get("/user/:userid", artisanController.getArtisanByUserIdController)

router.put("/:id",validate(updateArtisanSchema), artisanController.updateArtisanController)

router.patch("/:id/verify", artisanController.verifyArtisanController)

router.delete("/:id", artisanController.deleteArtisanController)

export default router