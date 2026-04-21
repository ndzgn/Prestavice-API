import { Offers, OfferStatus } from "@prisma/client";
import { CreateOfferDTO, UpdateOfferDTO } from "../../models/Offer";
import { prisma } from "../../config/Prisma";
import logger from "../../config/logger";
import { AppError } from "../../middlewares/errorHandler";
import { DatabaseError } from "pg";


//create offer
export const createOffer = async (data:CreateOfferDTO): Promise<Offers>=>{
    
  logger.debug("Starting offer creation process", {
    "userId": data.userId
  })

  const result = await prisma.offers.create({data});

  // ici on va ecrire la fonction qui permet de notifier tous les artisans qualifies pour cette offre

  logger.info("Offer create with success", {
    "offerId": result.id,
    "userdId": result.userId
  })
  return result  
}



// get offer by id
export const getOffer = async (offerId: string): Promise<Offers> =>{
  logger.debug("Fetching offer", {"offerId": offerId})
  const result = await prisma.offers.findUnique({
    where: {
      id: offerId
    }
  });

  if(!result)
  {
    logger.warn("Fetching offer faild,", {"offerId": offerId})
    throw new AppError('Offer not found', 404)
  }

  logger.info("Offer fetched with success",{"offerId": result.id} )

  return result;
}


//get all active offers
export const getActiveOffers = async (): Promise<Offers[]>=>{
  logger.debug("Fetching all active offers");

  const result = await prisma.offers.findMany({
    where: {
      status: "PENDING"
    }
  });

  if(result.length == 0)
  {
    logger.warn("No active offers found")
  }

  logger.info("Active offers fetched with success")

  return result
}

//update offer
export const updateOffer = async (offerId: string, data: UpdateOfferDTO): Promise<Offers> =>{


  logger.debug("Starting offer updating process", {"offerId": offerId});

  try {
    const foundOffer = await getOffer
  } catch (error) {
    logger.error(error)
  }


  const result = await prisma.offers.update({
    where:{
      id: offerId
    },
    data
  });

  logger.info("Offer updated with success", {"offerId": result.id})

  return result
}

//delete offer 
export const deleteOffer = async(offerId: string): Promise<void> =>{

  logger.debug("Starting offer deletion process", {"offerId": offerId})

  try {
    const foundOffer = await getOffer
  } catch (error) {
    logger.error(error)
  }

  const result = await prisma.offers.delete({where:{
    id: offerId
  }})

  logger.info("Offer deleted with success")
}

//set offer status 
export const setOfferStatus = async (offerId: string, status: OfferStatus):Promise<Offers> =>{
  logger.debug(`Starting set offer status to ${status}`, {"offerId": offerId} )

  try {
    const foundOffer = await getOffer
  } catch (error) {
    logger.error(error)
  }

  const result = await prisma.offers.update({
    where: {
      id: offerId
    },
    data :{
      status
    }
  })

  logger.info(`Offer status setted to ${status}`, {"offerId": offerId})

  return result
}

