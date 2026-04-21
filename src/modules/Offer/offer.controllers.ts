import { NextFunction,Request, Response } from "express";
import * as offerService from "./offer.service";
import logger from "../../config/logger";
import { OfferStatus } from "@prisma/client";



const basePathName = "/api/v1/offers"
// create offer request
export const createOfferRequest = async (req: Request, res: Response, next: NextFunction) =>{
  logger.info(`POST ${basePathName}/`, {
    "ip": req.ip,
  })

  try {
    
    const offer = await offerService.createOffer(req.body)
    
    res.status(201).json({
      success: true,
      message: "Offer create with success",
      data: offer
    })

  } catch (error) {
    next(error)
  }
}


//get offer request 
export const getOfferRequest = async (req:Request, res:Response, next: NextFunction) =>{
  logger.info(`GET ${basePathName}/:${req.params.id}`, {"ip": req.ip})
  try {

    const offer = await offerService.getOffer(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Offer found",
      data: offer
    })
    
  } catch (error) {
    next(error)
  }
}

// get active offers request
export const getActiveOffersRequest = async(req: Request, res: Response, next: NextFunction) =>{
  logger.info(`GET ${basePathName}/`)
  try {
    const offers = await offerService.getActiveOffers();

    res.status(200).json({
      success: true,
      message: `${offers.length} found with success`,
      data: offers
    })

  } catch (error) {
    next(error)
  }
}


// set offer status request
export const setOfferStatusRequest = async (req: Request, res: Response, next: NextFunction) =>{
  logger.info(`PATCH ${basePathName}/:${req.params.id}?status=${req.query.status}`)

  try {
    const offer = await offerService.setOfferStatus(req.params.id as string, req.query.status as OfferStatus)

    res.status(201).json({
      success: true,
      message: `Offer status updated with success`,
      data: offer
    })

  } catch (error) {
    next(error)
  }
}


export const updateOfferRequest = async (req: Request, res: Response, next: NextFunction)=>{
  logger.info(`PUT ${basePathName}/`)

  try {
    const offer = await offerService.updateOffer(req.params.id as string, req.body)

    res.status(201).json({
      success: true,
      message: "Offre mis a jour",
      data: offer
    })
  } catch (error) {
    next(error)
  }
}

export const deleteOfferRequest = async (req:Request, res: Response, next: NextFunction)=>{

  logger.info(`DELETE ${basePathName}/`)

  try {
    await offerService.deleteOffer(req.params.id as string);

    res.status(204).json({
      success: true,
      message: "Offer deleted with success",
      
    })
  } catch (error) {
    next(error)
  }
}



