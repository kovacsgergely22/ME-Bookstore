# Bookstore app

- npm i express dotenv

- https://github.com/dotenv-org

- npm i -D nodemon

- PORT=5000

- npm run start - node server
- npm run dev - nodemon server


## Backend

Az package.json-ban látható, hogy kétféle futtatási mód van beállítáva:

```
npm run start
```

paranccsal indítva a node server indul, az 

```
npm run server
```

nodemont használva indítja a szervert.

## Frontend

A frontend a frontend mappából futtatható:

```
npm run start
```

## Frontend és Backend együtt

A backend és a frontend közös futtatására a concurrently npm package-t használom. A package.json fájlban látható, hogy a következő paranccsal indítható:

```
npm run dev
```

## .gitignore
```
node_modules/
.env
```

A .env fájl konfigurációs beállításokat tartalmaz. Normál esetben ezt nem kellene feltölteni a GitHubra, de fontos információkat tartalmaz, mint a port száma, a MongoDB hozzáférési linkje benne cluster hozzáférési információival.

## Felhasznált tananyag

- [React Front to Back 2022 [Video]](https://subscription.packtpub.com/video/web-development/9781838645274/p1/video1_1/welcome-to-the-course)
- [The Complete Full-Stack Web Development Bootcamp](https://www.udemy.com/course/the-complete-web-development-bootcamp/?couponCode=ST16MT230625B)