
import { Offers, OfferStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateOfferDTO, UpdateOfferDTO } from "../../models/Offer";
import { prisma } from "../../config/Prisma";
import logger from "../../config/logger";
import { AppError } from "../../middlewares/errorHandler";
import { handlePrismaError } from "../../middlewares/prismaErrorHandler";
 
//Create offer 
 
export const createOffer = async (data: CreateOfferDTO): Promise<Offers|undefined> => {
  logger.debug("Starting offer creation process", { userId: data.userId });
 
  try {
    const result = await prisma.offers.create({ data });
 
    // TODO: notifier tous les artisans qualifiés pour cette offre
 
    logger.info("Offer created successfully", {
      offerId: result.id,
      userId: result.userId,
    });
 
    return result;
  } catch (error) {
    handlePrismaError(error, "createOffer");
  }
};
 
 
//Get offer by id 
 
export const getOffer = async (offerId: string): Promise<Offers|undefined> => {
  logger.debug("Fetching offer", { offerId });
 
  try {
    const result = await prisma.offers.findUnique({
      where: { id: offerId },
    });
 
    if (!result) {
      logger.warn("Offer not found", { offerId });
      throw new AppError("Offer not found", 404);
    }
 
    logger.info("Offer fetched successfully", { offerId: result.id });
 
    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;
    handlePrismaError(error, "getOffer");
  }
};
 
 
//Get all active offers 
 
export const getActiveOffers = async (): Promise<Offers[]|undefined> => {
  logger.debug("Fetching all active offers");
 
  try {
    const result = await prisma.offers.findMany({
      where: { status: OfferStatus.PENDING },
    });
 
    if (result.length === 0) {
      logger.warn("No active offers found");
    } else {
      logger.info("Active offers fetched successfully", { count: result.length });
    }
 
    return result;
  } catch (error) {
    handlePrismaError(error, "getActiveOffers");
  }
};
 
 
//Update offer 
 
export const updateOffer = async (
  offerId: string,
  data: UpdateOfferDTO
): Promise<Offers|undefined> => {
  logger.debug("Starting offer update process", { offerId });
 
  await getOffer(offerId);
 
  try {
    const result = await prisma.offers.update({
      where: { id: offerId },
      data,
    });
 
    logger.info("Offer updated successfully", { offerId: result.id });
 
    return result;
  } catch (error) {
    handlePrismaError(error, "updateOffer");
  }
};
 
 
//Delete offer 
 
export const deleteOffer = async (offerId: string): Promise<void> => {
  logger.debug("Starting offer deletion process", { offerId });
 
  await getOffer(offerId);
 
  try {
    await prisma.offers.delete({ where: { id: offerId } });
 
    logger.info("Offer deleted successfully", { offerId });
  } catch (error) {
    handlePrismaError(error, "deleteOffer");
  }
};
 
 
//Set offer status 
 
export const setOfferStatus = async (
  offerId: string,
  status: OfferStatus
): Promise<Offers|undefined> => {
  logger.debug(`Starting offer status update to ${status}`, { offerId });
 
  await getOffer(offerId);
 
  try {
    const result = await prisma.offers.update({
      where: { id: offerId },
      data: { status },
    });
 
    logger.info(`Offer status updated to ${status}`, { offerId });
 
    return result;
  } catch (error) {
    handlePrismaError(error, "setOfferStatus");
  }
};