import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import componentController from "../controllers/component.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;


const getComponent = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, client_id } = req.query;
    const result:any = await componentController.getComponent(
      name, client_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getComponent: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveComponent = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, client_id } = req.body;
    const result = await componentController.saveComponent(
      name,  client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveComponent: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateComponent = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, client_id } = req.body;
    const result:any = await componentController.updateComponent(
      id, name, client_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateComponent: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getComponent,
  saveComponent,
  updateComponent,
}