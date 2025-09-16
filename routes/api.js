import { Router } from "express";
import AutoController from "../DB/controller/AutoController.js";

import authMiddleWare from "../MiddleWare/Authicate.js";
import profileController from "../DB/controller/profileController.js";
import newsController from "../DB/controller/NewsController.js";

import { upload } from "../utils/multer.js"; // the file we just created
const router= Router()


router.post("/auth/register",AutoController.register);


router.post("/auth/login",AutoController.login);
// create news (with image upload)
router.post("/news", authMiddleWare,upload.single("image"), newsController.store);

// update news
router.put("/news/:id", authMiddleWare, upload.single("image"), newsController.update);

//private route//
router.get("/profile",authMiddleWare,profileController.index)
router.put("/profile/:id",authMiddleWare,upload.single("profile"),profileController.update);
//route for news
// Create news
//router.post("/news", authMiddleWare, newsController.store);

// Show all news
//router.get("/news", newsController.index);  // you can rename login → index

// Show single news
//router.get("/news/:id", newsController.show);

// Update news
//router.put("/news/:id", authMiddleWare, newsController.update);

// Delete news
//router.delete("/news/:id", authMiddleWare, newsController.destroy);


export default router;