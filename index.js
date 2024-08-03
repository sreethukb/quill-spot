import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fileUpload from "express-fileupload";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.get("/homepage", (req, res) => {
    res.render("homepage.ejs");
})

app.get("/homepage/India", (req, res) => {
    res.render("partials/India.ejs");
})

app.get("/homepage/Technology", (req, res) => {
    res.render("partials/Technology.ejs");
})

app.get("/homepage/Business", (req, res) => {
    res.render("partials/Business.ejs");
})

app.get("/homepage/Politics", (req, res) => {
    res.render("partials/Politics.ejs");
})

app.get("/homepage/Health", (req, res) => {
    res.render("partials/Health.ejs");
})

app.get("/homepage/Travel", (req, res) => {
    res.render("partials/Travel.ejs");
})

app.get("/about", (req, res) =>{
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

/*app.post("/contact", (req, res)=> {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pillaishreya10@gmail.com',
            pass: 'sreethu2003'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'pillaishreya10@gmail.com',
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})*/

app.post("/submit",  (req, res) => {
    const blogtitle = req.body["title"];
    const username = req.body["name"];
    const blogtext = req.body["blog-content"];
    if (req.files) {
        const file = req.files.file;
        const uploadPath = path.join(__dirname, 'uploads', file.name);

        file.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            const imagePath = `/uploads/${file.name}`;
            res.render('create.ejs', {
                title: blogtitle,
                author: username,
                blog: blogtext,
                image: imagePath,
            });
        });
    } else {
        res.render('create', {
            title: blogtitle,
            author: username,
            blog: blogtext,
            image: '',
        });
    }
})

app.get('/read/:id', (req, res) => {
    const id = req.params.id;
    res.render("partials/read.ejs", {id});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})