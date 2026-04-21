import { Router } from "express";
import * as offerController from "./offer.controllers";
import { validate } from "../../middlewares/validate";
import {
  createOfferSchema,
  updateOfferSchema,
} from "../../models/Offer";
 
 
const router = Router();
 
// POST   /api/v1/offers         
router.post(
  "/",
  validate(createOfferSchema),
  offerController.createOfferRequest
);
 
// GET    /api/v1/offers          
router.get(
  "/",
  offerController.getActiveOffersRequest
);
 
// GET    /api/v1/offers/:id       
router.get(
  "/:id",
  offerController.getOfferRequest
);
 
// PUT    /api/v1/offers/:id      
router.put(
  "/:id",
  validate(updateOfferSchema),
  offerController.updateOfferRequest
);
 
// PATCH  /api/v1/offers/:id/status?status=XXX 
router.patch(
  "/:id/status",
  offerController.setOfferStatusRequest
);
 
// DELETE /api/v1/offers/:id       
router.delete(
  "/:id",
  offerController.deleteOfferRequest
);
 
 
export default router;