import { Request, Response, NextFunction } from "express"
import * as artisanService from "../artisans/artisans.service"

// CREATE ARTISAN
export const createArtisanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisan = await artisanService.createArtisan(req.body)

    res.status(201).json({
      success: true,
      data: artisan
    })

  } catch (error) {
    next(error)
  }
}

// GET BY ID
export const getArtisanByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisan = await artisanService.findArtisanById(req.params.id as string)

    res.status(200).json({
      success: true,
      data: artisan
    })

  } catch (error) {
    next(error)
  }
}

// GET BY USER ID
export const getArtisanByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisan = await artisanService.findArtisanByUserId(req.params.userid as string)

    res.status(200).json({
      success: true,
      data: artisan
    })

  } catch (error) {
    next(error)
  }
}

// GET BY SERVICE
export const getArtisansByServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisans = await artisanService.findArtisansByService(req.query.service as string)

    res.status(200).json({
      success: true,
      data: artisans
    })

  } catch (error) {
    next(error)
  }
}

// GET BY TOWN
export const getArtisansByTownController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisans = await artisanService.findArtisansByTown(req.query.town as string)

    res.status(200).json({
      success: true,
      data: artisans
    })

  } catch (error) {
    next(error)
  }
}

// GET BY DISTRICT
export const getArtisansByDistrictController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisans = await artisanService.findArtisansByDistrict(req.query.district as string)

    res.status(200).json({
      success: true,
      data: artisans
    })

  } catch (error) {
    next(error)
  }
}

// GET ALL ACTIVE
export const getAllActiveArtisansController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisans = await artisanService.findAllActiveArtisans()

    res.status(200).json({
      success: true,
      data: artisans
    })

  } catch (error) {
    next(error)
  }
}

// UPDATE ARTISAN
export const updateArtisanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisan = await artisanService.updateArtisan(
      req.params.id as string,
      req.body
    )

    res.status(200).json({
      success: true,
      data: artisan
    })

  } catch (error) {
    next(error)
  }
}

// SOFT DELETE
export const deleteArtisanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisan = await artisanService.deleteArtisan(req.params.id as string)

    res.status(200).json({
      success: true,
      message: "Artisan deactivated",
      data: artisan
    })

  } catch (error) {
    next(error)
  }
}

// VERIFY ARTISAN
export const verifyArtisanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisan = await artisanService.verifyArtisan(req.params.id as string)

    res.status(200).json({
      success: true,
      message: "Artisan verified",
      data: artisan
    })

  } catch (error) {
    next(error)
  }
}

// GET VERIFIED ARTISANS
export const getVerifiedArtisansController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisans = await artisanService.findVerifiedArtisans()

    res.status(200).json({
      success: true,
      data: artisans
    })

  } catch (error) {
    next(error)
  }
}

// SEARCH (town + service)
export const searchArtisansController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artisans = await artisanService.findArtisansByTownAndService({
      service: req.query.service as string,
      town: req.query.town as string
    })

    res.status(200).json({
      success: true,
      data: artisans
    })

  } catch (error) {
    next(error)
  }
}