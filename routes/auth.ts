import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../models/user';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication (signup/login)
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User already exists
 */
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password required' });
      return;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash });

    res.status(201).json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Successfully logged in and returned JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: Bearer eyJhbGciOiJIUzI1NiIsInR5c...
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRY || '1h',
      } as SignOptions
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

export default router;



// import express, { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt, { SignOptions } from 'jsonwebtoken';
// import { User } from '../models/user';

// const router = express.Router();

// // Signup route
// router.post('/signup', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400).json({ error: 'Email and password required' });
//       return;
//     }

//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       res.status(409).json({ error: 'User already exists' });
//       return;
//     }

//     const hash = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ email, password: hash });

//     res.status(201).json({ id: newUser.id, email: newUser.email });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ error: 'Internal server error during signup' });
//   }
// });

// // Login route
// router.post('/login', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       res.status(401).json({ error: 'Invalid credentials' });
//       return;
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(401).json({ error: 'Invalid credentials' });
//       return;
//     }

//     const token = jwt.sign(
//       { userId: user.id },
//       process.env.JWT_SECRET as string,
//       {
//         expiresIn: process.env.JWT_EXPIRY || '1h',
//       } as SignOptions
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ error: 'Internal server error during login' });
//   }
// });

// export default router;
