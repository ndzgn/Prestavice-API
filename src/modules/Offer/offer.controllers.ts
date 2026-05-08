import { NextFunction, Request, Response } from "express";
import { OfferStatus } from "@prisma/client";
import * as offerService from "./offer.service";
import logger from "../../config/logger";
import { AppError } from "../../middlewares/errorHandler";


const basePathName = "/api/v1/offers";


//Create offer 

export const createOfferRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`POST ${basePathName}`, { ip: req.ip });

  try {
    const offer = await offerService.createOffer(req.body);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};


//Get offer by id 

export const getOfferRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`GET ${basePathName}/${req.params.id}`, { ip: req.ip });

  try {
    const offer = await offerService.getOffer(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Offer fetched successfully",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};


//Get all active offers 

export const getActiveOffersRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`GET ${basePathName}`, { ip: req.ip });

  try {
    const offers = await offerService.getActiveOffers();

    res.status(200).json({
      success: true,
      message: `${offers!.length} offer(s) fetched successfully`,
      data: offers,
    });
  } catch (error) {
    next(error);
  }
};


//Update offer 

export const updateOfferRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`PUT ${basePathName}/${req.params.id}`, { ip: req.ip });

  try {
    const offer = await offerService.updateOffer(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};


//Set offer status 

export const setOfferStatusRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    `PATCH ${basePathName}/${req.params.id}/status?status=${req.query.status}`,
    { ip: req.ip }
  );

  try {
    const status = req.query.status as string;
    const validStatuses = Object.values(OfferStatus);

    if (!validStatuses.includes(status as OfferStatus)) {
      throw new AppError(
        `Invalid status. Allowed values: ${validStatuses.join(", ")}`,
        400
      );
    }

    const offer = await offerService.setOfferStatus(
      req.params.id as string,
      status as OfferStatus
    );

    res.status(200).json({
      success: true,
      message: `Offer status updated to ${status} successfully`,
      data: offer,
    });
  } catch (error) {
    next(error);
  }
};


//Delete offer 

export const deleteOfferRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`DELETE ${basePathName}/${req.params.id}`, { ip: req.ip });

  try {
    await offerService.deleteOffer(req.params.id as string);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


