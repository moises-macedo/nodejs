import { FastifyInstance } from "fastify"
import { randomUUID } from 'node:crypto'
import { knex as knexDb } from '../database'
import { z, ZodError } from 'zod';

export async function meal(app: FastifyInstance) {

  app.post('/', async (req, res) => {

    const createtransActionsBody = z.object({
      name: z.string({ message: 'Name is required' }).min(3, 'Name is required'),
      description: z.string({ message: 'Description is required' })
        .min(4, { message: 'This field has to be filled' }),
      isDiet: z.boolean({ message: "it's a diet?" })


    })
    const { description, isDiet, name } = createtransActionsBody.parse(req.body)

    if (!req.cookies.sessionId) {
      return res.status(400).send({ massage: 'Unauthorized' })
    }

    await knexDb('meals').insert({
      id: randomUUID(),
      name,
      description,
      isDiet,
      user_id: req.cookies.sessionId
    })

    return res.status(201).send()
  })
  app.patch('/:id', async (req, res) => {
    try {
      const mealParams = z.object({
        id: z.string().uuid({ message: 'Invalid ID format' })
      });

      const updateMealBody = z.object({
        name: z.string().min(3, 'Name is required').optional(),
        description: z.string().min(4, 'Description is required').optional(),
        isDiet: z.boolean().optional()
      });

      const { id } = mealParams.parse(req.params);
      const { description, name, isDiet } = updateMealBody.parse(req.body);

      const idUser = req.cookies.sessionId;

      if (!idUser) {
        return res.status(401).send({ message: 'Unauthorized' });
      }

      const meal = await knexDb('meals').where('id', id).first();

      if (!meal) {
        return res.status(404).send({ message: 'Meal not found' });
      }

      const updatedMeal = {
        ...(name && { name }),
        ...(description && { description }),
        ...(typeof isDiet === 'boolean' && { isDiet }),
        created_at: new Date().toISOString()
      };


      if (Object.keys(updatedMeal).length > 0) {
        await knexDb('meals').where('id', id).update(updatedMeal);
      }

      return res.status(200).send({ message: 'Meal updated successfully' });

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ message: 'Validation error', issues: error.errors });
      }

      return res.status(500).send({ message: 'Internal server error' });
    }
  });
  app.get('/:id', async (req, res) => {
    try {
      const mealParams = z.object({
        id: z.string().uuid({ message: 'Invalid ID format' })
      });

      const { id } = mealParams.parse(req.params);


      const idUser = req.cookies.sessionId;

      if (!idUser) {
        return res.status(401).send({ message: 'Unauthorized' });
      }

      const meal = await knexDb('meals').where('id', id).first();

      if (!meal) {
        return res.status(404).send({ message: 'Meal not found' });
      }

      return res.status(200).send(meal);

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ message: 'Validation error', issues: error.errors });
      }

      return res.status(500).send({ message: 'Internal server error' });
    }
  });
  app.get('/', async (req, res) => {
    try {
      const idUser = req.cookies.sessionId;

      if (!idUser) {
        return res.status(401).send({ message: 'Unauthorized' });
      }

      const meals = await knexDb('meals').where('user_id', idUser)

      if (!meals) {
        return res.status(404).send({ message: 'Meal not found' });
      }

      return res.status(200).send(meals);

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ message: 'Validation error', issues: error.errors });
      }

      return res.status(500).send({ message: 'Internal server error' });
    }
  });
  app.delete('/:id', async (req, res) => {
    try {
      const mealParams = z.object({
        id: z.string().uuid({ message: 'Invalid ID format' })
      });

      const { id } = mealParams.parse(req.params);
      const idUser = req.cookies.sessionId;

      if (!idUser) {
        return res.status(401).send({ message: 'Unauthorized' });
      }

      const meal = await knexDb('meals').where('id', id).first();

      if (!meal) {
        return res.status(404).send({ message: 'Meal not found' });
      }

      await knexDb('meals').where('id', id).delete()

      return res.status(200).send({ message: 'Meal deleted successfully' });

    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send({ message: 'Validation error', issues: error.errors });
      }

      return res.status(500).send({ message: 'Internal server error' });
    }
  });
}