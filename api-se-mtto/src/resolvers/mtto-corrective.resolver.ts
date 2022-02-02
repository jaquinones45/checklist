import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import mttoCorrectiveController from "../controllers/mtto-corrective.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getPlantName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await mttoCorrectiveController.getPlantName(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getPlantName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getEquipmentName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await mttoCorrectiveController.getEquipmentName(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getEquipmentName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getMttoCorrective = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, plant_id, date, client_id } = req.query;
    const result:any = await mttoCorrectiveController.getMttoCorrective(
      name, plant_id, date, client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getMttoCorrective: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveMttoCorrective = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { description, notes, hours, plant_id, equipment_id, client_id } = req.body;
    const result = await mttoCorrectiveController.saveMttoCorrective(
      description, notes, hours, plant_id, equipment_id, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveMttoCorrective: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateMttoCorrective = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { description, notes, hours, plant_id, equipment_id, client_id } = req.body;
    const result:any = await mttoCorrectiveController.updateMttoCorrective(
      id, description, notes, hours, plant_id, equipment_id, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateMttoCorrective: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getPlantName,
  getEquipmentName,
  getMttoCorrective,
  saveMttoCorrective,
  updateMttoCorrective,
}