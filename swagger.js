const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jäsenrekisteri API",
      version: "1.0.0",
      description: "Yksinkertainen jäsenrekisteri MongoDB:llä"
    },

    paths: {

      "/jasenet": {

        get: {
          summary: "Hae kaikki jäsenet",
          responses: {
            200: {
              description: "Lista jäsenistä"
            }
          }
        },

        post: {
          summary: "Lisää uusi jäsen",

          requestBody: {
            required: true,

            content: {
              "application/json": {

                schema: {
                  type: "object",

                  properties: {
                    etunimi: { type: "string" },
                    sukunimi: { type: "string" },
                    osoite: { type: "string" },
                    postinumero: { type: "string" },
                    postitoimipaikka: { type: "string" },
                    puhelin: { type: "string" },
                    sahkoposti: { type: "string" },
                    jasenyydenAlkuPvm: { type: "string" }
                  }
                }
              }
            }
          },

          responses: {
            200: {
              description: "Jäsen lisätty"
            }
          }
        }
      },

      "/jasenet/{id}": {

        put: {
          summary: "Päivitä jäsenen tiedot",

          parameters: [
            {
              in: "path",
              name: "id",
              required: true,

              schema: {
                type: "string"
              }
            }
          ],

          requestBody: {
            required: true,

            content: {
              "application/json": {

                schema: {
                  type: "object",

                  properties: {
                    etunimi: { type: "string" },
                    sukunimi: { type: "string" },
                    osoite: { type: "string" },
                    postinumero: { type: "string" },
                    postitoimipaikka: { type: "string" },
                    puhelin: { type: "string" },
                    sahkoposti: { type: "string" },
                    jasenyydenAlkuPvm: { type: "string" }
                  }
                }
              }
            }
          },

          responses: {
            200: {
              description: "Jäsen päivitetty"
            }
          }
        },

        delete: {
          summary: "Poista jäsen",

          parameters: [
            {
              in: "path",
              name: "id",
              required: true,

              schema: {
                type: "string"
              }
            }
          ],

          responses: {
            200: {
              description: "Jäsen poistettu"
            }
          }
        }
      }
    }
  },

  apis: []

};

module.exports = swaggerJSDoc(options);
