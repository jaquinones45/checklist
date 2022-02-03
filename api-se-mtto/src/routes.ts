import { Router } from "express";

import auth from "./resolvers/auth.resolver"
import dashboard from "./resolvers/dashboard.resolver"
import users from "./resolvers/users.resolver"
import typeSystem from "./resolvers/type-system.resolver"
import routineMtto from "./resolvers/routine-mtto.resolver"
import mttoCorrective from "./resolvers/mtto-corrective.resolver"
import plant from "./resolvers/plant.resolver"
import equipment from "./resolvers/equipment.resolver"
import component from "./resolvers/component.resolver"
import country from "./resolvers/country.resolver"
import typeComponent from "./resolvers/type-component.resolver"
import client from "./resolvers/client.resolver"
import form from "./resolvers/form.resolver"
import fileUpload from "./resolvers/file-upload.resolver"

const router = Router();

/**
 * Api Auth 
 * @body {email} email el nombre del usuario a filtrar.
 * @body {string} password el correo del usuario a filtrar.
 * @body {string} rememberMe el id del usuario a filtrar.
 */
router.route("/api/auth/login").post(auth.saveAuthLogin);
  
 /**
  * Api Auth 
  * @param {string} users_id el id del usuario a filtrar.
  */
router.route("/api/auth/logout/:users_id").get(auth.getAuthLogout);

/**
 * Api Dashboard Top Session
 * @query {string} start_date la fecha inicial del evento a filtrar.
 * @query {string} end_date la fecha final del evento a filtrar.
 * @query {string} segment_id el id del segmento a filtrar.
 * @query {string} station_id el id de la estación a filtrar.
 */
 router.route("/api/dashboard/top-session").get(dashboard.getTopSession);

/**
 * Api User 
 * @query {string} search la fecha inicial del evento a filtrar.
 * @query {string} role_id la fecha final del evento a filtrar.
 * @query {string} position_id el id del segmento a filtrar.
 * @query {string} users_id el id de la estación a filtrar.
 * @query {string} turn_id el id del segmento a filtrar.
 */
router.route("/api/user").get(users.getUser);

/**
 * Api User 
 * @query {string} name el nombre del usuario a filtrar.
 * @query {string} email el correo del usuario a filtrar.
 * @query {string} password el id del usuario a filtrar.
 * @query {string} phone el id del usuario a filtrar.
 * @query {string} status el id del usuario a filtrar.
 * @query {string} role_id el id del usuario a filtrar.
 * @query {string} position_id el id del usuario a filtrar.
 * @query {string} users_id el id del usuario a filtrar.
 * @query {string} turn_id el id del usuario a filtrar.
 */
router.route("/api/user").post(users.saveUser);

/**
 * Api User 
 * @param {string} id el id del usuario a filtrar.
 * @query {string} name el nombre del usuario a filtrar.
 * @query {string} email el correo del usuario a filtrar.
 * @query {string} password el id del usuario a filtrar.
 * @query {string} phone el id del usuario a filtrar.
 * @query {string} status el id del usuario a filtrar.
 * @query {string} role_id el id del usuario a filtrar.
 * @query {string} position_id el id del usuario a filtrar.
 * @query {string} users_id el id del usuario a filtrar.
 * @query {string} turn_id el id del usuario a filtrar.
 */
router.route("/api/user/:id").put(users.updateUser);

/**
  * Api User 
  * @param {string} id el id del usuario a filtrar.
  * @query {string} users_id el id del usuario a filtrar.
  * @query {string} turn_id el id del usuario a filtrar.
*/
router.route("/api/user/:id").delete(users.deleteUser);

/**
 * Api User Select All
 */
router.route("/api/user/select-all").get(users.getSelectAll);

/**
  * Api Tipo de Sistema
  * @param {string} plant_id el id de la planta a filtrar.
  * @query {string} type_system_id el id del tipo de sistema a filtrar.
  * @query {string} date el id del usuario a filtrar.
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/type-system/getPlantName").get(typeSystem.getPlantName);

/**
  * Api Tipo de Sistema
  * @param {string} plant_id el id de la planta a filtrar.
  * @query {string} type_system_id el id del tipo de sistema a filtrar.
  * @query {string} date el id del usuario a filtrar.
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/type-system/getTypeSystemName").get(typeSystem.getTypeSystemName);

/**
  * Api Tipo de Sistema
  * @param {string} plant_id el id de la planta a filtrar.
  * @query {string} type_system_id el id del tipo de sistema a filtrar.
  * @query {string} date el id del usuario a filtrar.
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/type-system/getComponentName").get(typeSystem.getComponentName);

/**
  * Api Tipo de Sistema
  * @param {string} plant_id el id de la planta a filtrar.
  * @query {string} type_system_id el id del tipo de sistema a filtrar.
  * @query {string} date el id del usuario a filtrar.
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/type-system/getFormName").get(typeSystem.getFormName);

/**
  * Api Tipo de Sistema
  * @param {string} plant_id el id de la planta a filtrar.
  * @query {string} type_system_id el id del tipo de sistema a filtrar.
  * @query {string} date el id del usuario a filtrar.
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/type-system/getTypeQuestionName").get(typeSystem.getTypeQuestionName);

/**
  * Api Tipo Sistema
  * @query {string} name el nombre del tipo de sistema a filtrar.
  * @query {int} plant_id el id de la planta a filtrar.
  * @query {date} date la fecha del tipo de sistema a filtrar.
  * @query {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/type-system/getRevision").get(typeSystem.getTypeSystemRevision);

/**
  * Api Tipo Sistema
  * @query {string} name el nombre del tipo de sistema a filtrar.
  * @query {int} plant_id el id de la planta a filtrar.
  * @query {date} date la fecha del tipo de sistema a filtrar.
  * @query {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/type-system/getOneRevision/:revision_id").get(typeSystem.getOneTypeSystemRevision);

/**
  * Api Tipo Sistema
  * @query {string} name el nombre del tipo de sistema a filtrar.
  * @query {int} plant_id el id de la planta a filtrar.
  * @query {date} date la fecha del tipo de sistema a filtrar.
  * @query {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/type-system").get(typeSystem.getTypeSystem);

/**
 * Api Tipo de Sistma
 * @body {string} name el nombre del tipo de sistema a filtrar.
 * @body {int} plant_id el id de la planta a filtrar.
 * @body {int} client_id el id del tipo de sistema a filtrar.
 */
router.route("/api/type-system").post(typeSystem.saveTypeSystem);

/**
  * Api Tipo de Sistma
  * @body {string} name el nombre del tipo de sistema a filtrar.
  * @body {int} plant_id el id de la planta a filtrar.
  * @body {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/type-system/saveRevision").post(typeSystem.saveTypeSystemRevision);

/**
  * Api Tipo de Sistma
  * @body {string} name el nombre del tipo de sistema a filtrar.
  * @body {int} plant_id el id de la planta a filtrar.
  * @body {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/type-system/:id").put(typeSystem.updateTypeSystem);

/**
  * Api Tipo de Sistma Acualizar la revision
  * @params {int} id el id de la revision a filtrar.
  * @body {string} responsable el responsable de la revision a filtrar.
  * @body {string} date la fecha de la revision a filtrar.
  * @body {string} hours las horas de la revision a filtrar.
  * @body {string} status el estado de la revision a filtrar.
  * @body {int} type_system_id el id del tipo de sistema a filtrar.
  * @body {array} questions son las pregunta de la revision a filtrar.
*/
router.route("/api/type-system/updateRevision/:id").put(typeSystem.updateTypeSystemRevision);

/**
 * Api Tipo Sistema
 * @query {string} name el nombre del tipo de sistema a filtrar.
 * @query {int} plant_id el id de la planta a filtrar.
 * @query {date} date la fecha del tipo de sistema a filtrar.
 * @query {int} client_id el id del tipo de sistema a filtrar.
 */
router.route("/api/routine-mtto").get(routineMtto.getRoutineMtto);

/**
  * Api Mantenimiento Correctivo Planta
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/mtto-corrective/getPlantName").get(mttoCorrective.getPlantName);

/**
  * Api Mantenimiento Correctivo Equipo
  * @query {string} client_id el id del cliente a filtrar.
*/
router.route("/api/mtto-corrective/getEquipmentName").get(mttoCorrective.getEquipmentName);

/**
  * Api Tipo Sistema
  * @query {string} name el nombre del tipo de sistema a filtrar.
  * @query {int} plant_id el id de la planta a filtrar.
  * @query {date} date la fecha del tipo de sistema a filtrar.
  * @query {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/mtto-corrective").get(mttoCorrective.getMttoCorrective);

/**
 * Api Tipo de Sistma
 * @body {string} name el nombre del tipo de sistema a filtrar.
 * @body {int} plant_id el id de la planta a filtrar.
 * @body {int} client_id el id del tipo de sistema a filtrar.
 */
router.route("/api/mtto-corrective").post(mttoCorrective.saveMttoCorrective);


/**
  * Api Tipo de Sistma
  * @body {string} name el nombre del tipo de sistema a filtrar.
  * @body {int} plant_id el id de la planta a filtrar.
  * @body {int} client_id el id del tipo de sistema a filtrar.
*/
router.route("/api/mtto-corrective/:id").put(mttoCorrective.updateMttoCorrective);

/**
  * Api Equipo
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/plant").get(plant.getPlant);

/**
 * Api Equipo
 * @body {string} name el nombre del equipo a filtrar.
 * @body {string} name el id de la planta a filtrar.
 * @body {int} client_id el id del equipo a filtrar.
 */
router.route("/api/plant").post(plant.savePlant);

/**
  * Api Equipo
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/plant/:id").put(plant.updatePlant);

/**
  * Api Equipo
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/equipment").get(equipment.getEquipment);

/**
 * Api Equipo
 * @body {string} name el nombre del equipo a filtrar.
 * @body {string} name el id de la planta a filtrar.
 * @body {int} client_id el id del equipo a filtrar.
 */
router.route("/api/equipment").post(equipment.saveEquipment);

/**
  * Api Equipo
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/equipment/:id").put(equipment.updateEquipment);

/**
  * Api Componente
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/component/getTypeComponentName").get(component.getTypeComponentName);

/**
  * Api Componente
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/component").get(component.getComponent);

/**
 * Api Componente
 * @body {string} name el nombre del equipo a filtrar.
 * @body {string} name el id de la planta a filtrar.
 * @body {int} client_id el id del equipo a filtrar.
 */
router.route("/api/component").post(component.saveComponent);

/**
  * Api Componente
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/component/:id").put(component.updateComponent);

/**
  * Api Cliente
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/client/getCountryName").get(client.getCountryName);

/**
  * Api Cliente
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/client").get(client.getClient);

/**
 * Api Cliente
 * @body {string} name el nombre del equipo a filtrar.
 * @body {string} name el id de la planta a filtrar.
 * @body {int} client_id el id del equipo a filtrar.
 */
router.route("/api/client").post(client.saveClient);

/**
  * Api Cliente
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/client/:id").put(client.updateClient);

/**
  * Api Componente
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/country").get(country.getCountry);

/**
 * Api Equipo
 * @body {string} name el nombre del equipo a filtrar.
 * @body {string} name el id de la planta a filtrar.
 * @body {int} client_id el id del equipo a filtrar.
 */
router.route("/api/country").post(country.saveCountry);

/**
  * Api Equipo
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/country/:id").put(country.updateCountry);

/**
  * Api Componente
  * @query {string} name  el nombre del equipo a filtrar.
  * @query {int} client_id el id del equipo a filtrar.
*/
router.route("/api/type-component").get(typeComponent.getTypeComponent);

/**
 * Api Equipo
 * @body {string} name el nombre del equipo a filtrar.
 * @body {string} name el id de la planta a filtrar.
 * @body {int} client_id el id del equipo a filtrar.
 */
router.route("/api/type-component").post(typeComponent.saveTypeComponent);

/**
  * Api Equipo
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/type-component/:id").put(typeComponent.updateTypeComponent);


/**
 * Api Formulario obtener el nombre del componente
 */
router.route("/api/form/getCountryName").get(form.getCountryName);

/**
 * Api Formulario obtener el nombre del tipo de pregunta
 */
router.route("/api/form/getTypeComponentName").get(form.getTypeComponentName);

/**
 * Api Formulario obtener el nombre del tipo de pregunta
 */
router.route("/api/form/getOneForm/:id").get(form.getOneForm);

/**
 * Api Formulario
 * @query {string} name el nombre del formulario a filtrar.
 * @query {string} country el pais del formulario a filtrar.
 * @query {int} component_id el id del formulario a filtrar.
 */
router.route("/api/form").get(form.getForm);

/**
 * Api Formulario
 * @query {string} name el nombre del formulario a filtrar.
 * @query {string} country el pais del formulario a filtrar.
 * @query {int} component_id el id del formulario a filtrar.
 */
router.route("/api/form").post(form.saveForm);

/**
 * Api Formulario
 * @query {string} name el nombre del formulario a filtrar.
 * @query {string} country el pais del formulario a filtrar.
 * @query {int} component_id el id del formulario a filtrar.
 */
router.route("/api/form/question").post(form.saveFormQuestion);

/**
  * Api Equipo
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/form/:id").put(form.updateForm);

/**
  * Api Equipo
  * @param {int} id el id del equipo a filtrar.
  * @body {string} name el nombre del equipo a filtrar.
  * @body {int} client_id el id del equipo a filtrar.
*/
router.route("/api/form/question/:id").put(form.updateFormQuestion);

/**
 * Api Formulario
 * @query {string} name el nombre del formulario a filtrar.
 * @query {string} country el pais del formulario a filtrar.
 * @query {int} component_id el id del formulario a filtrar.
 */
 router.route("/api/file-upload").post(fileUpload.saveFileUpload);

export default router;
