const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send("Created wilder");
    } catch (error) {
      res.send("Error while creating wilder");
    }
  },

  findAll: async (req, res) => {
    try {
      const wilders = await dataSource.getRepository(Wilder).find();
      res.send(wilders);
    } catch (error) {
      res.status(500).send("Error while getting all wilders");
    }
  },

  update: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).update(req.params, req.body);
      res.send("Wilder update");
    } catch (error) {
      res.send("Error while updating the wilder");
    }
  },

  delete: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.params);
      res.send("Wilder deleted");
    } catch (error) {
      res.send("Error while deleting the wilder");
    }
  },

  addSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilderName });
      console.log(wilderToUpdate);
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skillName });
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("Skill added to wilder");
    } catch (error) {
      console.log(error);
      res.send("Error while adding skill to wilder");
    }
  },
};
