import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import routineMttoController from "../controllers/routine-mtto.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getRoutineMtto = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, plant_id, date, client_id } = req.query;
    const result:any = await routineMttoController.getRoutineMtto(
      name, plant_id, date, client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getRoutineMtto: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getOneRoutineMttoRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { revision_id } = req.params;
    const result:any = await routineMttoController.getOneRoutineMttoRevision(
      revision_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getOneRoutineMttoRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}



export default {
  getRoutineMtto,
  getOneRoutineMttoRevision,
}