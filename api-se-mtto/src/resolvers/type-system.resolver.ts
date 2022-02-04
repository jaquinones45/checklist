import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import typeSystemController from "../controllers/type-system.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getPlantName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await typeSystemController.getPlantName(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getPlantName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getTypeSystemName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await typeSystemController.getTypeSystemName(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeSystemName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getComponentName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await typeSystemController.getComponentName(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getComponentName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getFormName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await typeSystemController.getFormName(
      client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getFormName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getTypeQuestionName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id } = req.query;
    const result:any = await typeSystemController.getTypeQuestionName();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeQuestionName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getTypeSystem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, plant_id, date, client_id } = req.query;
    const result:any = await typeSystemController.getTypeSystem(
      name, plant_id, date, client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeSystem: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getTypeSystemRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { type_system_id } = req.query;
    const result:any = await typeSystemController.getTypeSystemRevision(
      type_system_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeSystemRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getOneTypeSystemRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { revision_id } = req.params;
    const result:any = await typeSystemController.getOneTypeSystemRevision(
      revision_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getOneTypeSystemRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveTypeSystem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, plant_id, client_id } = req.body;
    const result = await typeSystemController.saveTypeSystem(
      name, plant_id, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveTypeSystem: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveTypeSystemRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { responsable, date, hours, status, system_id, form_id, components } = req.body;
    const result = await typeSystemController.saveTypeSystemRevision(
      responsable, date, hours, status, system_id, form_id, components
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveTypeSystemRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateTypeSystem = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, plant_id, client_id } = req.body;
    const result:any = await typeSystemController.updateTypeSystem(
      id, name, plant_id, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateTypeSystem: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateTypeSystemRevision = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { responsable, date, hours, status, system_id, form_id, components } = req.body;
    const result:any = await typeSystemController.updateTypeSystemRevision(
      id, responsable, date, hours, status, system_id, form_id, components
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateTypeSystemRevision: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getPlantName,
  getTypeSystemName,
  getComponentName,
  getFormName,
  getTypeQuestionName,
  getTypeSystem,
  getTypeSystemRevision,
  getOneTypeSystemRevision,
  saveTypeSystem,
  saveTypeSystemRevision,
  updateTypeSystem,
  updateTypeSystemRevision,
}