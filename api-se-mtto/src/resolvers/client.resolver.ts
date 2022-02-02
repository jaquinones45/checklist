import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import clientController from "../controllers/client.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getCountryName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.query
    const result = await clientController.getCountryName();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getCountryName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getClient = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.query
    const result = await clientController.getClient(
      name
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getClient: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const saveClient = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name } = req.body
    const result = await clientController.saveClient(
      name
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveClient: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const updateClient = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name } = req.body
    const result = await clientController.updateClient(
      id, name
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateClient: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const deleteClient = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const result = await clientController.deleteClient(
      id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred deleteClient: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getSelectAll = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await clientController.getSelectAll();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getSelectAll: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getCountryName,
  getClient,
  saveClient,
  updateClient,
  deleteClient,
  getSelectAll
}