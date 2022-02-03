import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import fileUploadController from "../controllers/file-upload.controller";
const { OK, EXPECTATION_FAILED } = StatusCodes;

const saveFileUpload = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { client_id, plant_id, file } = req.body
    const result:any = await fileUploadController.saveFileUpload(
      client_id, plant_id, file
    );
    res.status(OK).json({data: result.data, message: result.message, success: result.success})
  } catch (error) {
    console.error("An error ocurred saveFileUpload: ",error);
    res.status(EXPECTATION_FAILED).json({ message: "Error, ocurrio un problema en la solicitud" });
  }
}

export default {
  saveFileUpload,
}