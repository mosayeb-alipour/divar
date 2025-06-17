/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: authorization Module and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 */

/**
 * @swagger
 * 
 *  /auth/send-otp:
 *    post:
 *      summary: Send OTP to user mobile this end point
 *      tags: 
 *        - Auth
 *      requestBody:
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              $ref: "#/components/schemas/SendOtp"
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/SendOtp"
 *      responses:
 *        200:
 *          description: success
 */