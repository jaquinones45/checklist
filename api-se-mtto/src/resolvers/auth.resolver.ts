import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import authController from "../controllers/auth.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const saveAuthLogin = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { email, password, rememberMe } = req.body
    const result:any = await authController.saveAuthLogin(
      email, password, rememberMe
    );
    res.status(OK).json({data: result.data, message: result.message, success: result.success})
  } catch (error) {
    console.error("An error ocurred saveAuthLogin: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getAuthLogout = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { users_id } = req.params
    console.log(users_id)
    const result = await authController.getAuthLogout(
      users_id 
    );
    res.status(OK).json({message: result, success: true})
  } catch (error) {
    console.error("An error ocurred saveAuth: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  saveAuthLogin,
  getAuthLogout,
}