import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import usersController from "../controllers/users.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const getUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { search, role_id, position_id, users_id, turn_id } = req.query
    const result = await usersController.getUser(
      search, role_id, position_id, users_id, turn_id
    );
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getUser: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const saveUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { name, email, password, phone, status, role_id, position_id, users_id, turn_id } = req.body
    const result = await usersController.saveUser(
      name, email, password, phone, status, role_id, position_id, users_id, turn_id
    );
    res.status(OK).json({message: result, success: true})
  } catch (error) {
    console.error("An error ocurred saveUser: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const updateUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { name, email, password, phone, status, role_id, position_id, users_id, turn_id } = req.body
    const result = await usersController.updateUser(
      id, name, email, password, phone, status, role_id, position_id, users_id, turn_id
    );
    res.status(OK).json({message: result, success: true})
  } catch (error) {
    console.error("An error ocurred updateUser: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const deleteUser = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { id } = req.params
    const { users_id, turn_id } = req.query
    const result = await usersController.deleteUser(
      id, users_id, turn_id
    );
    res.status(OK).json({message: result, success: true})
  } catch (error) {
    console.error("An error ocurred deleteUser: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

const getSelectAll = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await usersController.getSelectAll();
    res.status(OK).json({data: result, success: true})
  } catch (error) {
    console.error("An error ocurred getSelectAll: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getSelectAll
}