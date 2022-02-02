import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import formController from "../controllers/form.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getTypeComponentName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result:any = await formController.getTypeComponentName();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getTypeComponentName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getCountryName = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result:any = await formController.getCountryName();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getCountryName: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getOneForm = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const result:any = await formController.getOneForm(
      id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getOneForm: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const getForm = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, country_id, type_component_id } = req.query;
    const result:any = await formController.getForm(
      name, country_id, type_component_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getForm: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

const saveForm = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, country_id, type_component_id } = req.body;
    const result = await formController.saveForm(
      name, country_id, type_component_id
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred saveForm: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}


const updateForm = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, country_id, type_component_id } = req.body;
    const result:any = await formController.updateForm(
      id, name, country_id, type_component_id 
    );
    res.status(OK).json(result)
  } catch (error) {
    console.error("An error ocurred updateForm: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud", success: false });
  }
}

export default {
  getTypeComponentName,
  getCountryName,
  getOneForm,
  getForm,
  saveForm,
  updateForm,
}