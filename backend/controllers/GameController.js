import { Game, Developer, Publisher, Category, Tag, Language, Requirements, Image } from "../Models/models.js";

import connection from "../connection/connection.js";

class GameController {

  async createGame(req, res) {

    const transactionCreateGame = await connection.transaction();

    try {

      const {
        title,
        description,
        price,
        launchDate,
        logo,
        gamePlay,
        rating,
        developer,
        publisher,
        mainImage,
        images,
        categories,
        requirements,
        tags,
        languages,
      } = req.body;

      console.log(req.body);

      if(!developer){ throw new Error("El developer no puede estar vacio."); };
      if(!mainImage){ throw new Error("La imagen princial no puede estar vacia."); };
      if(!categories.length){ throw new Error("El juego debe tener por lo menos una categoria."); };
      if(!requirements.length){ throw new Error("El juego debe tener por lo menos un requerimiento."); };
      if(!languages.length){ throw new Error("El juego debe tener por lo menos un idioma."); };

      const gameResult = await Game.create(
        {
          title,
          description,
          price,
          launchDate,
          logo,
          gamePlay,
          rating,
          developer,
          publisher,
          mainImage,
          images,
          categories,
          requirements,
          tags,
          languages,
        },
        { transaction: transactionCreateGame},
      );

      await transactionCreateGame.commit();

      res.status(200).send({
        success: true,
        message: `El juego: ${gameResult.dataValues.title} fue creado con exito`,
      });

    } catch (error) {
      await transactionCreateGame.rollback();
      res.status(400).send({ success: false, message: error.message });
    }

  }

  async deleteGame(req, res){
    try {

      const { title } = req.body;
      const result = await Game.destroy({
        where: {
          title,
        },
      });

      res
      .status(200)
      .send({ success: true, message: "Juego eliminado con exito." });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }

  }

  async getAllGames(req, res){

    try {

      const result = await Game.findAll({
        attributes: [
          "title",
          "description",
          "price",
          "launchDate",
          "logo",
          "gamePlay",
          "rating",
          "DeveloperId",
          "PublisherId",
          "mainImageId",
        ],
        include: {
          model: Language,
          attributes: ["language"],
          through: { attributes: [] },
        },
      });

      res
      .status(200)
      .send({ success: true, message: result });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
    }

  }
}

export default GameController;