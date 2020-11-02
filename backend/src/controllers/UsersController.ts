import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import User from "../models/User";
import userView from "../views/user-view";
import * as Yup from "yup";

export default {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({ where: { email } });

    if (userExists) {
      return response.sendStatus(409);
    }

    const data = {
      name,
      email,
      password,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return response.status(201).json(user);
  },
};
