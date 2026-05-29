const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


const app = express();

app.use(express.json());
app.use(express.static("public"));

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

async function start() {
    try {
        await client.connect();
        console.log("Yhdistetty MongoDB:hen");

        const db = client.db("jasenrekisteri");
        const collection = db.collection("jasenet");


        // --------------Hae kaikki jäsenet tietokannasta----------------
        app.get("/jasenet", async (req, res) => {
            try {

                const jasenet = await collection.find().toArray();

                res.json(jasenet);

            } catch (err) {
                    console.log(err);
                    res.status(500).send("Virhe jäsenten haussa");
            }

        });


            // ---------------Lisää uusi jäsen tietokantaan-----------------
            app.post("/jasenet", async (req, res) => {
                try {
                    const uusiJasen = req.body;

                    const result = await collection.insertOne(uusiJasen);

                    res.json(result);

                } catch (err) {
                    console.log(err);
                    res.status(500).send("Virhe jäsenen lisäyksessä");
                }
        });


        // ---------------Päivitetään jäsenen tiedot-----------------
        app.put("/jasenet/:id", async (req, res) => {
            try {
                const id = req.params.id;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).send("Virheellinen ID");
                }

                const result = await collection.replaceOne(
                    { _id: new ObjectId(id) },
                    req.body
                );

                res.json(result);

            } catch (err) {
                res.status(500).send("Virhe päivityksessä");
            }
        });

        // ---------------Poistetaan jäsen tietokannasta-----------------
        app.delete("/jasenet/:id", async (req, res) => {
            try {
                const id = req.params.id;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).send("Virheellinen ID");
                }

                const result = await collection.deleteOne({
                    _id: new ObjectId(id)
                });

                res.json(result);

            } catch (err) {
                res.status(500).send("Virhe poistossa");
            }
        });

        app.listen(3000, () => {
            console.log("Palvelin käynnissä portissa 3000");
        });

    } catch (err) {
        console.log(err);
    }
}

start();