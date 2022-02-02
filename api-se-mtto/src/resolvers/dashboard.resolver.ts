import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import dashboardController from "../controllers/dashboard.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTopSession = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await dashboardController.getTopSession();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTopSession: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getTopSession
}