import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import typeComponentController from "../controllers/type-component.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;


const getTypeComponent = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.query;
    const result:any = await typeComponentController.getTypeComponent(
      name
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeComponent: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveTypeComponent = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.body;
    const result = await typeComponentController.saveTypeComponent(
      name
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveTypeComponent: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const updateTypeComponent = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name } = req.body;
    const result:any = await typeComponentController.updateTypeComponent(
      id, name
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateTypeComponent: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getTypeComponent,
  saveTypeComponent,
  updateTypeComponent,
}