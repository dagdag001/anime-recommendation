import express from "express"
import axios from "axios"

const app = express()
const port = 3000

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/random", async (req, res) => {
    try {
        const response = await axios.get("https://api.jikan.moe/v4/random/anime");
        const anime = response.data.data;
        
        const content = {
            title: anime.title,
            poster: anime.images.jpg.image_url,
            rank: anime.rank,
            url: anime.url,
            synopsis: anime.synopsis
        };

        res.render("anime.ejs", { content });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching anime. Try again!");
    }
});




app.listen(port, ()=>{
console.log(`Server working on port ${port}`)
})