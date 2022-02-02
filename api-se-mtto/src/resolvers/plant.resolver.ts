import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import plantController from "../controllers/plant.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;


const getPlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, client_id } = req.query;
    const result:any = await plantController.getPlant(
      name, client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getPlant: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const savePlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, client_id } = req.body;
    const result = await plantController.savePlant(
      name,  client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred savePlant: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updatePlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, client_id } = req.body;
    const result:any = await plantController.updatePlant(
      id, name, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updatePlant: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getPlant,
  savePlant,
  updatePlant,
}