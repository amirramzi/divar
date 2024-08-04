/**
 * @swagger
 * tags:
 *  - name: Option
 *    description: Option Module and Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOption:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *         - type
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *              - number
 *              - string
 *              - boolean
 *              - array
 *         enum:
 *           type: array
 *           item: string
 *     UpdateOption:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         required:
 *           type: boolean
 *         type:
 *           type: string
 *           enum:
 *              - number
 *              - string
 *              - boolean
 *              - array
 *         enum:
 *           type: array
 *           item: string
 *
 *
 */

/**
 * @swagger
 * /Option:
 *   post:
 *     summary: create new Option
 *     tags:
 *       - Option
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOption'
 *     responses:
 *       201:
 *         description: created
 */
/**
 * @swagger
 * /option:
 *   get:
 *     summary: Get all options
 *     tags:
 *       - Option
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /option/{id}:
 *   get:
 *     summary: Get  option by id
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /option/by-category/{categoryId}:
 *   get:
 *     summary: Get all options of category
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *   get:
 *     summary: Get all options of slug
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
// /**
//  * @swagger
//  * /option/{id}:
//  *   delete:
//  *     summary: delete  option by id
//  *     tags:
//  *       - Option
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description:deleted Successfully
//  */
/**
 * @swagger
 * /Option/{id}:
 *   delete:
 *     summary: delete  option by id
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: deleted Success
 */
/**
 * @swagger
 * /Option/{id}:
 *   put:
 *     summary: updated Option by id
 *     tags:
 *       - Option
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOption'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOption'
 *     responses:
 *       201:
 *         description: created
 */
