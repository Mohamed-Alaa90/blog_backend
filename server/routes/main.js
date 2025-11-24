const express = require("express");
const router = express.Router();
const post = require("../models/Post");


router.get("/", async (req, res) => {
    try {
        const data = await post.find();
        res.render("index", { data });
    } catch (error) {
        console.log(error);
    }
});

router.get("/about", (req, res) => {

    res.render("about",);
});
router.get("/posts", (req, res) => {

    res.render("posts",);
});

module.exports = router;
