import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import countryController from "../controllers/country.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;


const getCountry = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.query;
    const result:any = await countryController.getCountry(
      name
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getCountry: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveCountry = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, alias } = req.body;
    const result = await countryController.saveCountry(
      name, alias
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveCountry: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateCountry = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, alias } = req.body;
    const result:any = await countryController.updateCountry(
      id, name, alias
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateCountry: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getCountry,
  saveCountry,
  updateCountry,
}