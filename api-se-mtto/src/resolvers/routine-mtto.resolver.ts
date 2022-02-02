import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import routineMttoController from "../controllers/routine-mtto.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getPlant = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await routineMttoController.getPlant(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getPlant: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getTypeSystem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await routineMttoController.getTypeSystem(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeSystem: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

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

const getRoutineMttoRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { type_system_id } = req.query;
    const result:any = await routineMttoController.getRoutineMttoRevision(
      type_system_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getRoutineMttoRevision: ",error);
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

const saveRoutineMtto = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, plant_id, client_id } = req.body;
    const result = await routineMttoController.saveRoutineMtto(
      name, plant_id, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveRoutineMtto: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveRoutineMttoRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { responsable, date, hours, status, type_system_id, component_id, form_id, questions } = req.body;
    const result = await routineMttoController.saveRoutineMttoRevision(
      responsable, date, hours, status, type_system_id, component_id, form_id, questions
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveRoutineMttoRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateRoutineMtto = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, plant_id, client_id } = req.body;
    const result:any = await routineMttoController.updateRoutineMtto(
      id, name, plant_id, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateRoutineMtto: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateRoutineMttoRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { responsable, date, hours, status, type_system_id, component_id, form_id, questions } = req.body;
    const result:any = await routineMttoController.updateRoutineMttoRevision(
      id, responsable, date, hours, status, type_system_id, component_id, form_id, questions
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateRoutineMttoRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getRoutineMtto,
}