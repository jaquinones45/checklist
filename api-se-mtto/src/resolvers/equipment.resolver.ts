import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import equipmentController from "../controllers/equipment.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;


const getEquipment = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, client_id } = req.query;
    const result:any = await equipmentController.getEquipment(
      name, client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getEquipment: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveEquipment = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, client_id } = req.body;
    const result = await equipmentController.saveEquipment(
      name,  client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveEquipment: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateEquipment = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, client_id } = req.body;
    const result:any = await equipmentController.updateEquipment(
      id, name, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateEquipment: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getEquipment,
  saveEquipment,
  updateEquipment,
}